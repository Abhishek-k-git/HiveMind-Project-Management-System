import { Hexagon } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
    const { url = "/" } = props;
    return (
        <div className="flex items-center justify-center sm:justify-start">
            <Link to={url}>
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <Hexagon className="size-5" />
                </div>
            </Link>
        </div>
    );
};

export default Logo;
