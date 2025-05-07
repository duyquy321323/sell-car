import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const Hero = (props) => {

    const { title, breadcrumbList } = props;

    const breadcrumbs = Array.from(breadcrumbList);

    const lastBreadcrumb = breadcrumbs.at(breadcrumbs.length - 1);

    return (
        <>
            <section className="h-50 max-2xl:h-40 max-lg:h-32 max-sm:h-24 bg-[#12232E] px-32 max-2xl:px-24 max-lg:px-16 max-sm:px-8 flex flex-col">
                <div className="my-auto">
                    <h1 className="text-5xl max-xl:text-4xl max-sm:text-3xl mb-6">{title}</h1>
                    <Breadcrumb>
                        <BreadcrumbList className="text-white">
                            {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb, index) => 
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink href={breadcrumb.path}>{breadcrumb.name}</BreadcrumbLink>
                                <BreadcrumbSeparator/>
                            </BreadcrumbItem>
                            )}

                            <BreadcrumbItem>
                                <BreadcrumbLink href={lastBreadcrumb.path}>{lastBreadcrumb.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
        </>
    );
}

export default Hero;