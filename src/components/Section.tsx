import React from "react";

interface Props {
  title: string;
  reference: string;
  lang: string;
}

const Section = ({ title, reference, lang }: Props) => {
  return (
    <div className="rounded-3xl bg-neutral">
      <div className="section text-4xl font-bold top-24 bottom-8 sticky z-10 bg-background pt-8 px-8 pb-4 rounded-b-3xl">{ title }</div>
      <div className="bg-neutral p-8 rounded-3xl flex flex-col">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis dapibus urna. Nam posuere sem nec consectetur cursus. Nunc tempor condimentum nisl, nec feugiat ligula. Curabitur ut eleifend nisi. Vestibulum a faucibus metus, at luctus ante. Aenean sit amet ipsum magna. Cras faucibus, metus a ultricies eleifend, leo libero ornare arcu, at rhoncus tortor lacus id mi.</p>
        <p>Morbi vitae quam eu ipsum posuere imperdiet. Sed nisl diam, elementum ut nulla non, mattis imperdiet nisi. Donec sagittis mattis congue. Fusce dapibus imperdiet nunc, non congue nibh vulputate ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent dignissim sapien non eros pulvinar porta. Quisque elementum at leo vel mollis. Nunc non porttitor sapien. Curabitur vestibulum congue semper. Quisque et sem felis.</p>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ut sem at nunc fringilla luctus vel id sapien. Nullam luctus, ipsum sed fringilla interdum, ex libero consequat metus, et semper dui leo et odio. Sed dignissim dolor urna, eu cursus justo lobortis et. Vestibulum eu diam ac neque euismod tristique. Integer vel lacus leo. Donec dignissim tincidunt lectus eu sollicitudin.</p>
        <p>Sed commodo viverra ligula, eget venenatis nisl aliquet et. Aliquam gravida placerat nisi. Pellentesque tempus, dolor ultricies venenatis facilisis, libero neque scelerisque est, at suscipit nisl nulla nec sem. Proin eget laoreet urna. Donec dignissim elementum interdum. Quisque pharetra blandit erat, eget consequat magna cursus at. Duis ultricies gravida justo ac iaculis. Fusce commodo ex vel neque mattis pulvinar eget non lacus. Aliquam erat volutpat. Fusce commodo orci vel commodo efficitur. Ut commodo dapibus lacus, quis luctus augue ultrices et. Aliquam in elementum nulla, sit amet efficitur enim. Sed ac enim nec arcu mattis sodales.</p>
        <p>Aenean aliquet eros ex, sed tristique ligula rutrum ut. Nullam purus augue, fringilla et bibendum vel, sollicitudin eu metus. Quisque feugiat feugiat enim a eleifend. Nunc sed elit ultrices, viverra sem molestie, tristique magna. Morbi non risus sed quam pellentesque elementum at at augue. Donec ac tortor nisl. Donec iaculis consequat quam, et ultrices arcu consequat sit amet. Aliquam fermentum pulvinar est, varius lobortis risus interdum at.</p>
        <p>Fusce in congue lacus. Vivamus cursus tristique sodales. Integer vel vulputate mauris. Ut dignissim scelerisque molestie. Nullam consequat rhoncus hendrerit. Suspendisse convallis commodo mi eget pellentesque. Quisque in sodales nisi, eget lacinia sapien. Nullam sit amet est semper, finibus nulla ac, condimentum dui. Nulla condimentum eget tellus in pulvinar.</p>
        <p>In lorem nibh, imperdiet ac nisl ut, suscipit pellentesque felis. Nunc et odio turpis. Sed ultrices pharetra dui in gravida. Fusce eleifend faucibus mollis. Nullam nec lobortis purus. Nulla facilisi. Aenean non lectus libero. Vivamus efficitur metus sed ornare iaculis. Proin eu risus eu massa fringilla faucibus eget in purus. Mauris viverra dui a tristique laoreet. Donec mattis velit at libero interdum tincidunt. Fusce maximus tellus vitae nisl tincidunt, malesuada laoreet augue congue. Proin egestas, magna nec posuere venenatis, nisl ligula posuere ex, at rhoncus neque mauris id justo. Nunc ut enim ut nisi fermentum auctor.</p>
      </div>
    </div>
  );
};

export default Section;
