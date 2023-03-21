
import iPhoneImage from '../../assets/images/iphone-14.jpg'
import iPhoneHandImage from '../../assets/images/iphone-hand.png'
import { CallToActionButtons } from '../buttons'
import { scrollTo } from '../../utils'

export function Hero() {

    const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        scrollTo(".sound-section")
    }

    return (
        <section className="jumbotron-section wrapper">
            <h1 className="title">New</h1>
            <img className="logo" src={iPhoneImage} alt="iPhone 14 Pro" />
            <p className='text'> Big and bigger</p>
            <span className='description' >
                From $XX.XX/mo. for XX mo. or $XX before trade-in
            </span>
            <CallToActionButtons handleLearnMore={handleLearnMore} />
            <img className='iphone-img' src={iPhoneHandImage} alt="Hand holding iPhone" />
        </section>
    )
}
