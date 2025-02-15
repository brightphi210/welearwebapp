
import nodata from '../../assets/no-data.png'
const NoData = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='text-center'>
            <div className='w-20 justify-center flex m-auto'>
                <img src={nodata} alt="" />
            </div>
            <h2 className='pt-5 text-sm text-neutral-400'>No Data Found</h2>
        </div>
    </div>
  )
}

export default NoData