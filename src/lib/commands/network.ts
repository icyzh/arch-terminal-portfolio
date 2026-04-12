import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";

export function pingCmd(args: string[]): OutputLine[] {
  const host = args[0] || "localhost";
  const times = [0.042, 0.038, 0.041, 0.039];
  const lines: OutputLine[] = [
    { content: `PING ${host} (127.0.0.1) 56(84) bytes of data.`, color: "text-terminal-dim" },
  ];
  times.forEach((t, i) => {
    lines.push({ content: `64 bytes from ${host}: icmp_seq=${i + 1} ttl=64 time=${t} ms`, color: "text-terminal-green" });
  });
  lines.push({ content: `--- ${host} ping statistics ---`, color: "text-terminal-dim" });
  lines.push({ content: `4 packets transmitted, 4 received, 0% packet loss, time 3003ms`, color: "text-terminal-green" });
  lines.push({ content: `rtt min/avg/max/mdev = 0.038/0.040/0.042/0.002 ms`, color: "text-terminal-dim" });
  return lines;
}

export function curlCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: curl <url>", color: "text-terminal-yellow" }];
  if (args[0] === "wttr.in" || args[0] === "wttr.in/Delhi") {
    return [
      { content: "Weather report: New Delhi", color: "text-terminal-cyan" },
      { content: "      \\   /     Sunny", color: "text-terminal-yellow" },
      { content: "       .-.      +35\u00B0C", color: "text-terminal-yellow" },
      { content: "    \u2500 (   ) \u2500   \u2192 12 km/h", color: "text-terminal-dim" },
      { content: "       '-'      10 km visibility", color: "text-terminal-dim" },
      { content: "      /   \\     UV: 8 (Very High)", color: "text-terminal-red" },
    ];
  }
  return [
    { content: `> GET ${args[0]} HTTP/1.1`, color: "text-terminal-dim" },
    { content: `> Host: ${args[0].replace(/https?:\/\//, "").split("/")[0]}`, color: "text-terminal-dim" },
    { content: `> User-Agent: mohit-sh/2.0`, color: "text-terminal-dim" },
    { content: "" },
    { content: "< HTTP/1.1 200 OK", color: "text-terminal-green" },
    { content: "< Content-Type: application/json", color: "text-terminal-dim" },
    { content: "" },
    { content: `{"name":"${resumeData.name}","status":"open to opportunities","stack":"AI/ML","bear":"icy"}`, color: "text-terminal-green" },
  ];
}

export function wgetCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: wget <url>", color: "text-terminal-yellow" }];
  return [
    { content: `--${new Date().toISOString()}--  ${args[0]}`, color: "text-terminal-dim" },
    { content: "Resolving host... done.", color: "text-terminal-dim" },
    { content: "Connecting... connected.", color: "text-terminal-green" },
    { content: "HTTP request sent, awaiting response... 200 OK", color: "text-terminal-green" },
    { content: "Length: 1337 (1.3K) [text/html]", color: "text-terminal-dim" },
    { content: "'index.html' saved [1337/1337]", color: "text-terminal-green" },
  ];
}

export function sshCmd(args: string[]): OutputLine[] {
  return [{ content: "ssh: Connection refused. This is a portfolio, not a jump box.", color: "text-terminal-yellow" }];
}

export function ifconfigCmd(): OutputLine[] {
  return [
    { content: "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536", color: "text-terminal-cyan" },
    { content: "        inet 127.0.0.1  netmask 255.0.0.0", color: "text-terminal-dim" },
    { content: "" },
    { content: "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", color: "text-terminal-cyan" },
    { content: "        inet 192.168.1.42  netmask 255.255.255.0", color: "text-terminal-dim" },
    { content: "        RX packets 1337420  bytes 2.1 GiB", color: "text-terminal-dim" },
    { content: "        TX packets 420069   bytes 512 MiB", color: "text-terminal-dim" },
  ];
}

export function ipCmd(args: string[]): OutputLine[] {
  if (args[0] === "addr" || args[0] === "a") {
    return ifconfigCmd();
  }
  return [{ content: "usage: ip addr | ip a", color: "text-terminal-yellow" }];
}

export function digCmd(args: string[]): OutputLine[] {
  const host = args[0] || "mohitmadan.dev";
  return [
    { content: `; <<>> DiG 9.18.24 <<>> ${host}`, color: "text-terminal-dim" },
    { content: ";; ANSWER SECTION:", color: "text-terminal-cyan" },
    { content: `${host}.\t300\tIN\tA\t127.0.0.1`, color: "text-terminal-green" },
    { content: `;; Query time: 12 msec`, color: "text-terminal-dim" },
  ];
}

export function tracerouteCmd(args: string[]): OutputLine[] {
  const host = args[0] || "github.com";
  return [
    { content: `traceroute to ${host}, 30 hops max, 60 byte packets`, color: "text-terminal-dim" },
    { content: " 1  gateway (192.168.1.1)  1.234 ms  1.123 ms  1.089 ms", color: "text-terminal-green" },
    { content: " 2  isp-router (10.0.0.1)  5.678 ms  5.432 ms  5.321 ms", color: "text-terminal-green" },
    { content: " 3  * * *", color: "text-terminal-dim" },
    { content: ` 4  ${host} (140.82.121.4)  12.345 ms  12.234 ms  12.123 ms`, color: "text-terminal-green" },
  ];
}

export function netstatCmd(): OutputLine[] {
  return [
    { content: "Active Internet connections", color: "text-terminal-cyan" },
    { content: "Proto Recv-Q Send-Q Local Address       Foreign Address     State", color: "text-terminal-dim" },
    { content: "tcp        0      0 0.0.0.0:443         0.0.0.0:*           LISTEN", color: "text-terminal-green" },
    { content: "tcp        0      0 192.168.1.42:443    visitor:54321       ESTABLISHED", color: "text-terminal-green" },
  ];
}

export function ssCmd(): OutputLine[] {
  return netstatCmd();
}
