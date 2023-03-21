
export type CallToActionButtonsProps = {
    handleLearnMore?: React.MouseEventHandler<HTMLAnchorElement>
    handleBuy?: React.MouseEventHandler<HTMLAnchorElement>
}

export function CallToActionButtons({ handleLearnMore, handleBuy } : CallToActionButtonsProps) {
    return (
        <ul className="links">
            <li>
                <a className="button hover-scale" onClick={handleBuy ? handleBuy : null}>Buy</a>
            </li>
            <li>
                <a className="link hover-scale" onClick={handleLearnMore ? handleLearnMore : null}>Learn more</a>
            </li>
        </ul>
    )
}
