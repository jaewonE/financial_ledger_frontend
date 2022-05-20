export const CostTable = ({ status, message }) => {
  return (
    <div
      className={`w-full min-w-min h-full ${
        status === 'spend-page' ? 'min-h-[750px]' : 'min-h-[300px]'
      } bg-slate-300 rounded-lg p-5 bluePrint text-xl`}
    >
      {message ? message : 'Cost Table'}
    </div>
  );
};
