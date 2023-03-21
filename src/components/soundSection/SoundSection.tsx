import { CallToActionButtons } from "../buttons";
import { scrollTo } from "../../utils";


export function SoundSection() {

  const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    scrollTo(".display-section.wrapper")
}

  return (
    <section className="sound-section wrapper">
        <div className="body">
            <div className="sound-section-content content">
                <h2 className="title">New Sound System</h2>
                <p className="text">Feel the base</p>
                <span className="description">From $XX.XX/mo. for XX mo. or $XX before trade-in</span>
                <CallToActionButtons handleLearnMore={handleLearnMore} />
            </div>
        </div>
    </section>
  )
}
