function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-[17.79px] top-[1.5px] w-[117.453px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#960010] text-[14px] text-nowrap tracking-[-0.1504px]">Notă importantă:</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-[22px] top-[22px] w-[436px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#960010] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">💡</p>
      <BoldText />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#960010] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[372px]">{`Furnizorii selectați vor fi adăugați automat în secțiunea "Furnizori"`}</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[19px] not-italic text-[#960010] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[377px]">Prețurile sunt calculate pe baza numărului de invitați (250)</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[19px] not-italic text-[#960010] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">Poți modifica sau adăuga furnizori după finalizare</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#960010] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[417px]">Serviciile cu ⭐ sunt considerate esențiale pentru evenimentul tău</p>
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[132px] items-start left-[30px] top-[50px] w-[428px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#faf2f3] relative size-full" data-name="Container">
      <Paragraph />
      <List />
    </div>
  );
}