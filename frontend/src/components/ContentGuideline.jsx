
export const ContentGuideline = ({ className = '' }) => {
  return (
    <section className={`bg-white self-center min-h-[268px] w-full max-w-[1147px] text-black ml-[22px] mt-[35px] px-[33px] py-[22px] max-md:max-w-full max-md:px-5 ${className}`}>
      <h2 className="text-3xl font-bold">Content Guidelines</h2>
      <div className="text-xl font-normal mt-5 max-md:max-w-full">
        <p>
          <span className="font-bold">Focus on Learning:</span>
          <span className="font-light"> Emphasize constructive takeaways and lessons learned.</span>
        </p>
        <br />
        <p>
          <span className="font-bold">Maintain Anonymity: </span>
          <span className="font-light">
            If discussing real individuals or specific non-public company details, please anonymize to protect privacy.
          </span>
        </p>
        <br />
        <p>
          <span className="font-bold">Be Constructive:</span>{" "}
          <span className="font-light">
            Frame feedback positively, focusing on growth opportunities.
          </span>
        </p>
        <br />
        <p>
          <span className="font-bold">Provide Context:</span>{" "}
          <span className="font-light">
            Clearly describe the situation to help others understand the nuances.
          </span>
        </p>
        <br />
        <br />
        <p>
          You contributions build a supportive learning environment. Thank you for sharing you expertise!
        </p>
      </div>
    </section>
  );
};
