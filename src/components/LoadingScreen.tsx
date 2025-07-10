

export default function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-10 h-10 rounded-full animate-bounce"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #ffffff, #cccccc)',
                    boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.2), inset 2px 2px 6px rgba(255,255,255,0.3)'
                }}>
            </div>
        </div>
    )
}