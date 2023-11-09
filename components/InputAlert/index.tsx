export default function AlertInput({
  children,
}: {
  children: React.ReactNode
}) {
  return Boolean(children) ? (
    <span role="alert" className="text-xs text-destructive">
      {children}
    </span>
  ) : null
}
