import AnimatedLogo from '../../assets/images/logo-animated.gif'

export function Loader() {

    return (
        <div className='loader'>
            <img className='logo' src={AnimatedLogo} alt='Apple Page Loader' />
        </div>
    )
}