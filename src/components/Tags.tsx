interface TagsProps {
  items: readonly string[];
}

export default function Tags({ items }: TagsProps) {
  return (
    <ul
      className="mt-5 flex flex-wrap gap-2"
      aria-label="Technologies and skills"
    >
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-line px-3 py-[7px] text-[10px]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
