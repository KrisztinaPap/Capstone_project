import React, { useState, useEffect, useContext } from 'react';


const HeaderComp = () => {

  const [mobile, setMobile] = useState(false)

  // Citation: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setViewWidth(window.innerWidth);

    }, 100)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });

  useEffect(() => {
    if (viewWidth >= 768) {
      // md screens+
      setMobile(false);
    } else {
      // xs-sm screens
      setMobile(true);
    }
  }, [viewWidth])

  if (mobile){
    return (
      <>
        <section>
          <div className="w-full h-1 border-top box-shadow bg-purple-500"/>
          <img src={"/yummy-mobile-banner.png"} alt="yummy mobile banner" className="mx-auto"/>
        </section>
      </>
    )
  } else {

    return (
      <>
        <section>
          <div className="w-full h-1 border-top box-shadow bg-purple-500"/>
          <img src={"/yummy-banner.png"} alt="yummy desktop banner" className="mx-auto"/>
        </section>
      </>
    );
  }
}

export default HeaderComp;


