import { execSync } from "node:child_process";

const ports = [8443, 3001];

function freePortsWindows(portList) {
  for (const port of portList) {
    try {
      const output = execSync(
        `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique"`,
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
      );

      const pids = output
        .split(/\r?\n/)
        .map((line) => parseInt(line.trim(), 10))
        .filter((pid) => !isNaN(pid) && pid > 4 && pid !== process.pid);

      for (const pid of pids) {
        try {
          console.log(`[clean-ports] Freeing port ${port} by stopping process PID ${pid}...`);
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        } catch {
          // Process might have terminated already
        }
      }
    } catch {
      // Ignore if no process was using this port
    }
  }
}

function freePortsUnix(portList) {
  for (const port of portList) {
    try {
      const output = execSync(`lsof -ti:${port}`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      const pids = output
        .split("\n")
        .map((line) => parseInt(line.trim(), 10))
        .filter((pid) => !isNaN(pid) && pid !== process.pid);

      for (const pid of pids) {
        try {
          console.log(`[clean-ports] Freeing port ${port} by stopping process PID ${pid}...`);
          execSync(`kill -9 ${pid}`, { stdio: "ignore" });
        } catch {
          // Ignore
        }
      }
    } catch {
      // Ignore
    }
  }
}

console.log(`[clean-ports] Checking ports ${ports.join(", ")}...`);
if (process.platform === "win32") {
  freePortsWindows(ports);
} else {
  freePortsUnix(ports);
}
console.log("[clean-ports] Ports are ready and available.");
