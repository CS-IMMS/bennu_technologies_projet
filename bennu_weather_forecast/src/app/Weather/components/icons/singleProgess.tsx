'use client';
interface props {
    size: string;
    time: string;
}
const SingleProgess = (prop: props) => {
    const { size, time } = prop;
    console.log(size);

    return (
        <>
            <div className=''>
                <div className='flex  '>
                    <div style={{ height: "100px", width: "20px", position: "relative", borderRadius: "20px" }}>
                        <div style={{ height: `${size}%`, width: "100%", backgroundColor: "#4CAF50", position: "absolute", bottom: "0", borderRadius: "20px", zIndex: "2" }}></div>
                    </div>
                    <div style={{ height: "90px", border: "2px dashed red", marginLeft: "-12px", zIndex: "1" }}></div>
                </div>
                <div className="flex text-sm">
                    <p >{time}</p>
                    <p>AM</p>
                </div>
            </div >

        </>
    )
}
export default SingleProgess;