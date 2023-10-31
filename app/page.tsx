export default function Home() {
  return (
    <div className="flex h-full w-full flex-col md:flex-row ">
      <div className="order-last h-full w-full bg-slate-500 md:order-none md:w-1/2">
        <h1>The BEST place for you to find a Friend</h1>
      </div>
      <div className="h-2/3 w-full bg-slate-500 md:w-1/2">
        <h1>Picture</h1>
      </div>
    </div>
  );
}
