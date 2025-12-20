import React from "react";

interface Props {
  subtitle: string;
  callMyApi: () => void;
}

export const MySubTitle = React.memo(({ subtitle, callMyApi }: Props) => {
  console.log("My Subtitle re-render");

  return (
    <>
      <h6 className="text-3xl font-bold">{subtitle}</h6>

      <button
        onClick={callMyApi}
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
      >
        Llamar a función
      </button>
    </>
  );
});
