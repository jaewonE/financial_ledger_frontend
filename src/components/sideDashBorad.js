import { Link } from 'react-router-dom';

const LinkCss = 'w-full my-3 pl-6 text-sm';

export const SideDashBoard = () => {
  return (
    <div className="w-[200px] bg-slate-200 h-screen flex flex-col justify-start items-start pt-8">
      <Link className={LinkCss} to="/dashBoard">
        대시보드
      </Link>
      <Link className={LinkCss} to="/spend">
        수입/지출 내역
      </Link>
      <Link className={LinkCss} to="/category">
        카테고리
      </Link>
      <Link className={LinkCss} to="/report/weekly">
        주간 보고서
      </Link>
      <Link className={LinkCss} to="/report/monthly">
        월간 보고서
      </Link>
    </div>
  );
};
