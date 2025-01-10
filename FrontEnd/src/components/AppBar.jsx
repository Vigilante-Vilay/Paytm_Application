export function AppBar() {
    return (
      <div className="shadow-md h-16 flex items-center justify-between px-6 bg-white">
        <div className="text-lg font-semibold">
          Transaction App
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-700 font-medium">
            Hello
          </div>
          <div className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center font-bold text-lg">
            U
          </div>
        </div>
      </div>
    );
  }