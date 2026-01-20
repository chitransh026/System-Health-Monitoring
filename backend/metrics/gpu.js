import si from 'systeminformation';

export async function getGPUInfo(){
    const gpus=await si.graphics()
    if(gpus.controllers.length===0){
        console.log("no GPU detected")
        return 'No GPU Found'
    }
    else{
        const Mode=gpus.controllers[0].model
        const Vendor=gpus.controllers[0].vendor
        const  VRAM=gpus.controllers[0].vram
        const driver_info=gpus.controllers[0].driverVersion
        const usage=gpus.controllers[0].utilizationGpu ||0

        return {
            Mode,Vendor,VRAM,driver_info
        }
    }
}

