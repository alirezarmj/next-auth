import ProfileForm from '@/components/profile/profile-form'
import { getSession } from 'next-auth/react'


const ProfilePage = () => {
    return (
        <ProfileForm />
    )
}


export async function getServerSideProps(context) {
    const session = await getSession({req:context?.req})
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
              },
        }
    }
    return {
        props: { session }
    }
}

export default ProfilePage