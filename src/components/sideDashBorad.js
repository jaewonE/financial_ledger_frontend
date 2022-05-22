import { Link } from 'react-router-dom';
import { routeList } from '../route-info';

export const SideDashBoard = () => {
  return (
    <div className="w-[70px] md:w-[220px] pl-1 md:pl-4 md:min-w-[165px] h-auto flex flex-col justify-start items-start pt-12 border border-y-0 boder-l-0">
      <div className="w-full h-9 md:h-7"></div>
      <Link
        className="w-full h-16 md:mt-3 md:pl-2 pb-1 flex justify-center md:justify-start items-center text-sm"
        to="/new"
      >
        <div className="flex items-center rounded-3xl border-2 shadow-md pl-2 md:pl-4 pr-0 md:pr-8 py-1 group hover:bg-gradient-to-r from-purple-400 to-pink-600 z-10">
          <i className="fa-solid fa-plus font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mr-3 group-hover:text-white"></i>
          {/* <span className="font-semibold text-lg text-gray-500 hidden md:block"> */}
          <span class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hidden md:block group-hover:text-white">
            New
          </span>
        </div>
      </Link>
      {routeList.map((row) => (
        <Link
          to={row.herf}
          key={row.key}
          className="w-full py-2 md:mt-3 md:pl-4 flex justify-center md:justify-start items-center text-sm"
        >
          <i
            className={`${row.icon} mr-3 text-gray-500 text-2xl mb-2 -z-10`}
          ></i>
          <span
            id={row.key}
            className="font-bold text-gray-500 hidden md:block pb-2"
          >
            {row.name}
          </span>
        </Link>
      ))}
    </div>
  );
};
