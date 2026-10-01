import AsyncStorageManagement from '@/data/storage/asyncstorage'
import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(()=>{
    const Verify_Onbaording = async():Promise<any>=>{
      try{
        const token = await  AsyncStorageManagement.getToken()
        if(token){
          console.log("had a butiful ");
          return router.replace('/(auth)/login')
        }
        router.replace('/onboarding');
      }
      catch(err){
        console.error(err)
      }
    }
  },[])
}
