import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col justify-center items-center gap-5 h-screen px-5">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold">REST Assured</h1>

        <h2 className="text-sm text-muted-foreground">
          AI based Schema generator & REST API builder
        </h2>
      </div>

      {children}
    </main>
  );
};

export default AuthLayout;
