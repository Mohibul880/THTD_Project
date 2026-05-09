import profileImage from "../images/profile.jpg";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">

      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          THTD Society
        </a>
      </div>

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />

        <div className="dropdown dropdown-end">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >

            <div className="w-10 rounded-full">

              <img
                src={profileImage}
                alt="Profile"
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Navbar;