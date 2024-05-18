"use client"
import * as React from 'react';
import { SignIn } from "@clerk/nextjs";
const image = "https://www.avikalp.com/cdn/shop/products/AWZ0237-3D-Wallpaper-Mural-Retro-Vintage-Car-Walking-Wall-3D-Stereo-Restaurant-Bar-Mural-Background_wallpaper2.jpg?v=1559476940"
export default function Page() {
  const mainRef = React.useRef<HTMLElement | null>(null)
  React.useLayoutEffect(() => {
    const mainDiv = mainRef.current;
    if (mainDiv) {
      mainDiv.style.background = `url(${image})`
      mainDiv.style.backgroundPosition = `center`
      mainDiv.style.backgroundSize = `cover`
    };
  }, []);
  return (
    <>
      <main ref={mainRef} id="login">
        <div className=' flex justify-center items-center pt-5 h-screen'>
          {/* <div className="flex gap-2 flex-col">
            <div>
              <Input name="email" autoComplete="true" type="email" className=" border-2" />
            </div>
            <div>
              <Input autoComplete='false' name="password" type="password" className=" border-2" />
            </div>

          </div> */}
          <SignIn />
        </div>
      </main>

    </>
  )
}