import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import SearchIcon from '../../assets/images/search.svg'
import StoreIcon from '../../assets/images/store.svg'

export function Nav() {
    const navigate = useNavigate()

    const handleLogoClick = (e : React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        navigate('/')
    }

  return (
    <nav className="nav-wrapper">
        <div className="nav-content">
            <ul className="list-styled">
                <li>
                    <img onClick={handleLogoClick} className='cursor-pointer hover-scale' src={Logo} alt='Apple' />
                </li>
                <li>
                    <a className='link-styled' >Store</a>
                </li>
                <li>
                    <a className='link-styled' >Mac</a>
                </li>
                <li>
                    <a className='link-styled' >iPhone</a>
                </li>
                <li>
                    <a className='link-styled' >Watch</a>
                </li>
                <li>
                    <a className='link-styled' >Airpods</a>
                </li>
                <li>
                    <a className='link-styled' >TV & Home</a>
                </li>
                <li>
                    <a className='link-styled' >Entertainment</a>
                </li>
                <li>
                    <a className='link-styled' >Accessories</a>
                </li>
                <li>
                    <a className='link-styled' >Support</a>
                </li>
                <li>
                    <img src={SearchIcon} alt="Search" />
                </li>
                <li>
                    <img src={StoreIcon} alt="Store" />
                </li>
            </ul>
        </div>
    </nav>
  )
}

