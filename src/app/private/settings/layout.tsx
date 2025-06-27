import SettingsTabs from "@/customComponents/SettingsTabs"

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                {/* header */}
                <div className="layoutContainer p-4 h-full flex flex-col mb-10">
                    <div className="headerText">
                        <p className="subHeader text-[24px] text-darkGrey">
                            Settings
                        </p>

                        <p className='subText text-base mt-2 text-darkGrey'>Manage your store configurations and other business managerial functions here.</p>
                    </div>

                    {/* tabs */}
                    <div className="tabs my-6 h-[36px] sticky top-0 z-10 bg-[#f8f8fb]">
                        <SettingsTabs />
                    </div>
                    <main className="w-full h-full">{children}</main>

                </div>
            </body>
        </html>
    )
}