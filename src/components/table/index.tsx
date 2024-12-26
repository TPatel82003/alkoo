export function Table() {
  const rows: string[] = ["DATE/TIME", "PING", "UPLOAD", "DOWNLOAD", "SERVER"];
  return (
    <table>
      <thead>
        {rows.map((item: string) => (
          <td className="bg-[#1a1b2e]  p-8 font-semibold text-[16px] text-[#9193a8]">
            {item}
          </td>
        ))}
      </thead>
    </table>
  );
}
