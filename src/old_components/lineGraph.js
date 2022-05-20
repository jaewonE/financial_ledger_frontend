export const LineGraph = ({ status, message }) => {
  return (
    <div
      className={`w-full ${
        status ? 'h-96' : 'h-full'
      } mb-6 bg-slate-300 rounded-md mt-2 bluePrint text-2xl`}
    >
      {message ? message : 'Line graph'}
    </div>
  );
};
