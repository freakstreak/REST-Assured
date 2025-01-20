function parsePrismaSchema(content) {
  const delimiters = [
    { start: "'''schema.prisma", end: "'''" },
    { start: "'''schema.prisma", end: "'''" },
    { start: "```schema.prisma", end: "```" },
  ];

  for (const { start, end } of delimiters) {
    const startIndex = content.indexOf(start);
    const endIndex = content.indexOf(end, startIndex + start.length);

    if (startIndex !== -1 && endIndex !== -1) {
      return content.substring(startIndex + start.length, endIndex).trim();
    }
  }

  throw new Error("No valid delimiters found in the content.");
}

export default parsePrismaSchema;
