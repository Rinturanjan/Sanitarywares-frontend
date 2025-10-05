import girl from "../assets/image/girl.jpg"

function BG() {
  return (
    <>
        <div className='fixed -top-10 lg:-top-32 xl:-top-40 inset-0 -z-10 blur-[1.3px] md:blur-xs'>
            <div className='absolute min-h-screen size-[210vw] md:size-[1000px] lg:size-[1200px] xl:size-[1500px] flex justify-center items-center'>
              <span ><img src={girl} alt="" className='w-full h-full object-cover' /></span>
            </div>
        </div>
    </>
  )
}

export default BG