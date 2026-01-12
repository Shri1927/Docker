# Docker helper commands

This short reference contains a practical `docker-refresh` workflow and steps to let the current user use Docker without elevated privileges.

---

## 1) `docker-refresh` (quick workflow)
Purpose: rebuild image, replace running container, and clean up dangling artifacts.

- Bash (Linux/macOS):

```bash
# build image, stop & remove old container, run new container, then prune dangling artifacts
docker build -t my-node-app:latest ./my-node-app \
  && docker rm -f my-node-app 2>/dev/null || true \
  && docker run -d --restart unless-stopped -p 3000:3000 --name my-node-app my-node-app:latest \
  && docker system prune -f
```

- As a convenient alias (bash):

```bash
alias docker-refresh="docker build -t my-node-app:latest ./my-node-app && docker rm -f my-node-app 2>/dev/null || true && docker run -d --restart unless-stopped -p 3000:3000 --name my-node-app my-node-app:latest && docker system prune -f"
```

- PowerShell (Windows) example:

```powershell
# Build, stop/remove if exists, run
docker build -t my-node-app:latest .\my-node-app
docker stop my-node-app -ErrorAction SilentlyContinue
docker rm my-node-app -ErrorAction SilentlyContinue
docker run -d --restart unless-stopped -p 3000:3000 --name my-node-app my-node-app:latest
```

> Tip: replace `my-node-app` and the port mapping with your app's values.

---

## 2) Allow the current user to use Docker (no sudo / non-admin)

- Linux (Ubuntu / Debian-like):

```bash
# create docker group (if needed), add current user, then log out/in
sudo groupadd docker || true
sudo usermod -aG docker $USER
# activate the new group in current shell (or log out/in)
newgrp docker
# verify
docker run hello-world
```

- Windows (Docker Desktop):

```powershell
# Run PowerShell as Administrator:
Add-LocalGroupMember -Group "docker-users" -Member $env:USERNAME
# Restart Docker Desktop or log out and in, then verify:
docker version
```

---

## 3) Notes & security tips

- Mapping the Docker socket to a container grants that container control over the host Docker daemon. Only use with trusted images:

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock ...
```

- On Linux, adding users to the `docker` group grants effective root permissions for Docker operations; be cautious on multi-user systems.

- For production deployments prefer orchestrators (Kubernetes, Docker Swarm) and avoid running containers with unnecessary host access.

---

If you'd like, I can also add a short section into `first-readme.md` linking to this file or directly insert the commands into it instead — tell me your preference.