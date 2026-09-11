import { execSync } from 'node:child_process';

const port = process.argv[2] ?? '3000';

try {
  const output = execSync(`lsof -ti:${port}`, { encoding: 'utf-8' }).trim();
  if (!output) process.exit(0);

  const pids = output.split('\n').filter(Boolean);
  for (const pid of pids) {
    try {
      process.kill(Number(pid), 'SIGTERM');
    } catch {
      // process may have already exited
    }
  }

  // Brief wait so the port is released before the next server binds.
  execSync('sleep 0.3');

  console.log(`[free-port] Porta ${port} liberada (PIDs: ${pids.join(', ')})`);
} catch {
  // Nothing listening on this port.
}
