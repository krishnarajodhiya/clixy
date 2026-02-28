import DashboardHeader from "@/components/dashboard/Header";
import CreateLinkForm from "@/components/links/CreateLinkForm";

export default function CreateLinkPage() {
    return (
        <div>
            <DashboardHeader title="Create Tracking Link" />
            <div className="p-6 animate-fade-in">
                <div className="mb-6">
                    <h2 className="text-2xl font-medium uppercase tracking-widest text-[#e5e5e5] mb-1">New Tracking Link</h2>
                    <p className="text-[#a3a3a3] font-bold uppercase tracking-wider text-sm">
                        Create a short link that captures platform, device, and country analytics on every click.
                    </p>
                </div>
                <div className="card rounded-xl p-6 border border-solid border-[#2b2b2b] bg-[#111111]">
                    <CreateLinkForm />
                </div>
            </div>
        </div>
    );
}
