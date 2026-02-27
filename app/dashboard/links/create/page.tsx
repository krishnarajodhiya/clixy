import DashboardHeader from "@/components/dashboard/Header";
import CreateLinkForm from "@/components/links/CreateLinkForm";

export default function CreateLinkPage() {
    return (
        <div>
            <DashboardHeader title="Create Tracking Link" />
            <div className="p-6 animate-fade-in">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-1">New Tracking Link</h2>
                    <p className="text-gray-400 text-sm">
                        Create a short link that captures platform, device, and country analytics on every click.
                    </p>
                </div>
                <div className="glass-card rounded-2xl p-6">
                    <CreateLinkForm />
                </div>
            </div>
        </div>
    );
}
