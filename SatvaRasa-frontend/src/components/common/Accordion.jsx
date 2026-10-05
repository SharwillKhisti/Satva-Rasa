import { useState } from "react";

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex((current) =>
            current === index ? null : index
        );
    };

    return (
        <div className="border-t border-bark/10">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        key={item.title}
                        className="border-b border-bark/10"
                    >
                        <button
                            type="button"
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between py-5 text-left"
                            aria-expanded={isOpen}
                        >
              <span className="text-sm text-forest-dark">
                {item.title}
              </span>

                            <span className="text-lg text-bark/50">
                {isOpen ? "−" : "+"}
              </span>
                        </button>

                        {isOpen && (
                            <div className="pb-5 text-sm text-bark/70 leading-relaxed">
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}