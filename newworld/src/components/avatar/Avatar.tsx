export default function Avatar({ src = null, size = 16, alt }: { src?: string, size?: number, alt: string }) {

    return (
        <div className="avatar">
            <div className={`rounded-full border border-gray-400`} style={{ height: size + "rem", width: size + "rem"}} >
                <img alt={alt} src={src == null ? "https://img.daisyui.com/images/profile/demo/distracted2@192.webp" : src} />
            </div>
        </div>
    )
}