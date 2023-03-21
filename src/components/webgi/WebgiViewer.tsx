import {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
    useEffect,
    forwardRef
} from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
    TweakpaneUiPlugin,
    IViewerPlugin,
    CanvasSnipperPlugin
} from "webgi";

import { Vector3, CameraController } from "webgi";

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scrollAnimation } from "../../lib";

gsap.registerPlugin(ScrollTrigger)

export type WebgiViewerHandle = {
    triggerPreview: () => void
}

export type WebgiViewerProps = {
    contentRef: React.RefObject<HTMLDivElement>
}

export const WebgiViewer = forwardRef<WebgiViewerHandle, WebgiViewerProps>(({ contentRef } : WebgiViewerProps, ref) => {

    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    const [viewerRef, setViewerRef] = useState<ViewerApp | null>(null)
    const [targetRef, setTargetRef] = useState<Vector3 | null>(null)
    const [positionRef, setPositionRef] = useState<Vector3 | null>(null)
    const [cameraRef, setCameraRef] = useState<CameraController | null>(null)
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    const [isMobile, setIsMobile] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            setPreviewMode(true)
            canvasContainerRef.current.style.pointerEvents = "all";
            canvasContainerRef.current.style.cursor = "grab";
            gsap.to(!isMobile ? '.content' : '.mobile-or-tablet', {
                opacity: 0,
                translateY: "-10%",
                duration: 2
            }
            )
            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty()
                    cameraRef.positionTargetUpdated(true)
                }
            })

            gsap.to(targetRef, {
                x: 0.11,
                y: 0.0,
                z: 0.0,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty()
                    cameraRef.positionTargetUpdated(true)
                }
            })

            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
        }
    }))

    const memoizedScrollAnimation = useCallback((position : Vector3, target: Vector3, isMobile: boolean, onUpdate: () => void) => {
        if (position && target && onUpdate) {
            scrollAnimation(position, target, isMobile, onUpdate)
        }
    }, [])

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current
        })

        setViewerRef(viewer)

        const isMobileOrTablet = mobileAndTabletCheck();
        setIsMobile(isMobileOrTablet)

        console.log(isMobileOrTablet)

        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera;
        setCameraRef(camera)
        const position = camera.position
        setPositionRef(position)
        const target = camera.target
        setTargetRef(target)

        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        
        viewer.renderer.refreshPipeline()
        
        await manager.addFromPath('scene-black.glb')
                viewer.getPlugin(TonemapPlugin).config.clipBackground = true
        
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false})

        if (isMobileOrTablet) {
            position.set(-16.7, 1.17, 11.7)
            target.set(0, 1.37, 0)
            contentRef.current.className = "mobile-or-tablet"
        }

        window.scrollTo(0, 0)

        let needsUpdated = true;

        const onUpdate = () => {
            needsUpdated = true
            viewer.setDirty()
        }

        viewer.addEventListener("preFrame", () => {
            if (needsUpdated) {
                camera.positionTargetUpdated(true)
                needsUpdated = false
            }

        })

        memoizedScrollAnimation(position, target, isMobileOrTablet, onUpdate)
    }, [])

    useEffect(() => {
        setupViewer()
    }, [])

    const handleExit = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        setPreviewMode(false)
        canvasContainerRef.current.style.pointerEvents = "none";
        canvasContainerRef.current.style.cursor = "default";

        gsap.to(!isMobile ? '.content' : '.mobile-or-tablet', {
            opacity: 1,
            translateY: "0",
            duration: 1
        }
        )

        gsap.to(positionRef, {
            x: !isMobile ? 1 : 9.36,
            y: !isMobile ? 13 : 10.95,
            z: !isMobile ? 0 : 0.09,
            onUpdate: () => {
                viewerRef?.setDirty()
                cameraRef?.positionTargetUpdated(true)
            }
        })
        
        gsap.to(targetRef, {
            x: !isMobile ? -0.55 : -1.6,
            y: !isMobile ? 0.32 : 0.02,
            z: !isMobile ? 0.0 : 0.06,
            onUpdate: () => {
                viewerRef?.setDirty()
                cameraRef?.positionTargetUpdated(true)
            }
        })

        viewerRef?.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
    }, [positionRef, targetRef, viewerRef, canvasContainerRef, cameraRef, isMobile])

    return (
        <div id="webgi-canvas-container" ref={canvasContainerRef}>
            <canvas id="webgi-canvas" ref={canvasRef}
                onMouseDown={() => {
                    if (previewMode) {
                        canvasContainerRef.current.style.cursor = "grabbing"
                    }
                }}
                onMouseUp={() => {
                    if (previewMode) {
                        canvasContainerRef.current.style.cursor = "grab"
                    }
                }} />
            {
                previewMode && 
                <a className="button" onClick={handleExit}>Exit</a>
            }
        </div>
    )
})