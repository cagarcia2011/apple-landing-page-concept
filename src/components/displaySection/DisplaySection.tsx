import { scrollTo } from "../../utils";

type DisplaySectionProps = {
  triggerPreview: () => void
}

export function DisplaySection({ triggerPreview }: DisplaySectionProps) {
  const handleTopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollTo(".jumbotron-section")
  }

  const handleTriggerPreview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    triggerPreview()
  }

  return (
    <section className="display-section wrapper">
      <h2 className="title" >New</h2>
      <p className="text">Brilliant.</p>
      <span className="description">A display that's up to 2x brighter in the sun.</span>
      <a className="button hover-scale" onClick={handleTriggerPreview}>Try me!</a>
      <a onClick={handleTopClick} className="back-button hover-scale">TOP</a>
    </section>
  )
}
