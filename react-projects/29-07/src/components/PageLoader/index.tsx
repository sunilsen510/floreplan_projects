
import Image from 'next/image';

const PageLoader = ()=>{
    return (
        <div className='loader'>
          <Image
            src="/images/loader.gif"
            className=""
            width={100}
            height={100}
            alt="loader"
            placeholder="empty"
            loading="eager"
            quality={100}
            priority
            unoptimized
          />
        </div>
    )
}
export default PageLoader;