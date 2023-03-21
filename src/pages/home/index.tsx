import { useRef } from "react"
import { DisplaySection, Hero, SoundSection, WebgiViewer, WebgiViewerHandle, Loader } from "../../components"

export function Home() {
  const webgiViewerRef = useRef<WebgiViewerHandle>();
  const contentRef = useRef();

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview()
  }

  return (
    <>
      <div ref={contentRef} className="content">
        <Loader />
        <Hero />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview}/>
      </div>
      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </>
  )
}
