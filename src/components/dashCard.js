export const DashCard = ({ location, message }) => {
  const x = location?.x ? location.x : null;
  return (
    <div
      className={`w-[19rem] h-36 rounded-2xl bg-slate-200 shadow-md mb-6 ${
        x ? x : 'ml-3'
      } bluePrint`}
    >
      {message ? message : 'Dash Card'}
    </div>
  );
};
