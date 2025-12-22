import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import InstagramFeed from "../components/InstagramFeed";
import { Link } from "react-router-dom";

// Flat Burger brand colors
const FLAT_BEIGE = "#feebcb";
const FLAT_BLUE = "#1c33c3";
const DARK_BG = "#0a0a0a";
const OFF_WHITE = "#f8f8f8";

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return isMobile;
}

// Flat Burger Logo - Perfectly centered SVG
function FlatBurgerLogo({ 
  size = 120, 
  className = "",
  color = FLAT_BLUE,
}: { 
  size?: number; 
  className?: string;
  color?: string;
}) {
  // SVG viewBox calculated from path bounds:
  // Top Bun: translate(100, 97) with path ranging ~(-52, 365) x (0, 97) = actual (48-465, 97-194)
  // Wavy Patty: translate(89, 214) with path ranging ~(-42, 375) x (-6, 59) = actual (47-464, 208-273)  
  // Middle Line: translate(65, 288) with path ranging ~(-17, 400) x (0, 33) = actual (48-465, 288-321)
  // Bottom Bun: translate(100, 337) with path ranging ~(-52, 365) x (0, 97) = actual (48-465, 337-434)
  // Total bounds: ~(47-465, 97-434) = width 418, height 337
  // Using viewBox with padding for clean display
  return (
    <svg
      width={className ? "100%" : size}
      height={className ? "100%" : size}
      viewBox="10 60 492 420"
      className={`block ${className}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {/* Top Bun */}
      <path d="M0 0 C1.40251469 -0.00417941 2.80502599 -0.00966025 4.20753109 -0.01631981 C8.03837352 -0.0307136 11.8689997 -0.02654883 15.69985366 -0.019153 C19.84038902 -0.01440851 23.98087845 -0.02694248 28.12139893 -0.03717041 C36.22410715 -0.05433881 44.32673775 -0.05520248 52.42945944 -0.04995751 C59.01760828 -0.04591086 65.60573424 -0.04736524 72.19388199 -0.05270576 C73.60208686 -0.0538284 73.60208686 -0.0538284 75.03874031 -0.05497371 C76.9461162 -0.05650524 78.85349209 -0.05804359 80.76086797 -0.05958868 C98.63524049 -0.07330668 116.5095692 -0.06788099 134.38394071 -0.05640347 C150.72262064 -0.04647222 167.0611873 -0.05941112 183.39984976 -0.08333766 C200.19222034 -0.1077426 216.9845382 -0.11733307 233.77692616 -0.11068493 C243.19824017 -0.10719576 252.6194671 -0.10940479 262.04076767 -0.12693596 C270.06100686 -0.14167539 278.08109763 -0.14227066 286.10133396 -0.12486505 C290.18997103 -0.11636692 294.27834317 -0.11417623 298.36696625 -0.1295166 C302.11632495 -0.14340943 305.8651929 -0.13854229 309.61452354 -0.11927737 C311.59944856 -0.11376841 313.58439886 -0.12775047 315.56927574 -0.14263147 C330.20069446 -0.02317438 341.05626763 4.80602234 351.7204895 14.70018005 C361.71339988 25.25872687 364.48488732 36.80595929 364.39016724 50.91795349 C363.97938694 65.04034244 358.13337051 76.11633732 347.9079895 85.79393005 C336.90922961 94.84129706 325.87594285 96.84050417 311.940979 96.77536011 C310.53846432 96.77953952 309.13595301 96.78502036 307.73344791 96.79167992 C303.90260548 96.8060737 300.07197931 96.80190894 296.24112535 96.79451311 C292.10058999 96.78976862 287.96010055 96.80230259 283.81958008 96.81253052 C275.71687186 96.82969892 267.61424125 96.83056258 259.51151957 96.82531761 C252.92337073 96.82127096 246.33524477 96.82272535 239.74709702 96.82806587 C238.33889214 96.82918851 238.33889214 96.82918851 236.90223869 96.83033382 C234.9948628 96.83186535 233.08748691 96.83340369 231.18011104 96.83494879 C213.30573852 96.84866679 195.43140981 96.8432411 177.55703829 96.83176357 C161.21835837 96.82183233 144.8797917 96.83477123 128.54112925 96.85869776 C111.74875866 96.88310271 94.9564408 96.89269318 78.16405284 96.88604504 C68.74273883 96.88255587 59.3215119 96.8847649 49.90021133 96.90229607 C41.87997215 96.9170355 33.85988137 96.91763077 25.83964504 96.90022516 C21.75100798 96.89172703 17.66263584 96.88953634 13.57401276 96.90487671 C9.82465406 96.91876954 6.0757861 96.9139024 2.32645546 96.89463747 C0.34153044 96.88912852 -1.64341985 96.90311057 -3.62829673 96.91799158 C-18.25971546 96.79853449 -29.11528862 91.96933777 -39.7795105 82.07518005 C-49.77242087 71.51663324 -52.54390831 59.96940082 -52.44918823 45.85740662 C-52.03840793 31.73501767 -46.1923915 20.65902279 -35.9670105 10.98143005 C-24.96825061 1.93406305 -13.93496385 -0.06514406 0 0 Z M-16.0295105 38.45018005 C-19.4566687 43.48381866 -19.6871971 47.36660557 -19.0295105 53.38768005 C-16.68158392 58.26414295 -13.74190196 60.79105619 -9.0295105 63.38768005 C-5.45809875 64.29838886 -2.11918882 64.51435929 1.55814743 64.51910782 C2.67723897 64.52294896 3.7963305 64.52679011 4.94933391 64.53074765 C6.17373408 64.52988117 7.39813425 64.52901469 8.65963745 64.52812195 C10.61662563 64.53257863 10.61662563 64.53257863 12.61314893 64.53712535 C16.23298423 64.54518432 19.85279969 64.5469843 23.4726429 64.54772282 C27.37733618 64.54957528 31.2820192 64.55712356 35.18670654 64.56385803 C43.72393115 64.57743376 52.26115106 64.58346481 60.79838467 64.58786869 C66.12981452 64.59063224 71.46124257 64.59486978 76.7926712 64.59937286 C91.55621095 64.61156423 106.31974924 64.62186401 121.08329391 64.62524796 C122.50033782 64.6255773 122.50033782 64.6255773 123.94600888 64.62591331 C125.36642446 64.62624072 125.36642446 64.62624072 126.81553531 64.62657475 C128.73437421 64.62701822 130.6532131 64.62746478 132.572052 64.62791443 C133.99976464 64.62824657 133.99976464 64.62824657 135.45631996 64.62858543 C150.87907595 64.63253347 166.3017847 64.64998826 181.72452244 64.67327395 C197.56184987 64.69699246 213.39915359 64.70945002 229.23649907 64.71061587 C238.12737556 64.71153232 247.01819047 64.71727706 255.90904999 64.73543549 C263.47968139 64.75084316 271.05023218 64.75595298 278.62087628 64.74769738 C282.48224484 64.74379332 286.34345111 64.7447085 290.20479965 64.75875473 C294.39445239 64.77385563 298.58374014 64.76562003 302.77340698 64.75517273 C303.98888427 64.76322913 305.20436155 64.77128554 306.45667148 64.77958608 C317.25311015 64.76986043 317.25311015 64.76986043 326.58690715 59.93574643 C330.65574852 55.19939005 331.32645058 51.98901218 331.24783325 45.92674255 C330.83672506 42.16307603 329.4876259 40.16977818 326.9704895 37.38768005 C321.53353959 33.107528 317.16001467 32.26500364 310.38283157 32.25625229 C309.26374004 32.25241114 308.1446485 32.24857 306.9916451 32.24461246 C305.76724493 32.24547894 304.54284476 32.24634542 303.28134155 32.24723816 C301.97668277 32.24426704 300.67202398 32.24129591 299.32783008 32.23823476 C295.70799477 32.23017578 292.08817932 32.2283758 288.46833611 32.22763729 C284.56364283 32.22578483 280.6589598 32.21823655 276.75427246 32.21150208 C268.21704785 32.19792635 259.67982794 32.1918953 251.14259434 32.18749142 C245.81116448 32.18472787 240.47973643 32.18049032 235.1483078 32.17598724 C220.38476806 32.16379587 205.62122976 32.1534961 190.85768509 32.15011215 C189.91298915 32.14989259 188.96829321 32.14967302 187.99497013 32.1494468 C187.04802641 32.14922852 186.10108268 32.14901024 185.1254437 32.14878535 C183.2066048 32.14834189 181.2877659 32.14789532 179.368927 32.14744568 C177.94121436 32.14711353 177.94121436 32.14711353 176.48465905 32.14677468 C161.06190305 32.14282664 145.63919431 32.12537185 130.21645656 32.10208616 C114.37912913 32.07836765 98.54182541 32.06591008 82.70447993 32.06474423 C73.81360345 32.06382779 64.92278853 32.05808305 56.03192902 32.03992462 C48.46129762 32.02451695 40.89074682 32.01940713 33.32010272 32.02766272 C29.45873416 32.03156679 25.5975279 32.03065161 21.73617935 32.01660538 C17.54652662 32.00150448 13.35723887 32.00974008 9.16757202 32.02018738 C7.95209474 32.01213097 6.73661746 32.00407457 5.48430753 31.99577403 C-2.33366451 32.04138553 -10.59134838 32.1198586 -16.0295105 38.45018005 Z" fill={color} transform="translate(100.02951049804688,96.61231994628906)"/>
      {/* Wavy Patty */}
      <path d="M0 0 C6.91737241 3.5224634 12.31424387 8.3669864 17.87890625 13.71484375 C24.32819995 19.9061657 29.65761132 24.62248767 38.87890625 25.08984375 C50.52072603 24.43555543 57.15472096 16.28119305 65.00390625 8.6484375 C76.00422188 -1.59560643 90.76475027 -6.09081458 105.6796875 -5.6328125 C122.08315874 -3.8502619 134.00839117 2.30681627 145.87890625 13.71484375 C152.32819995 19.9061657 157.65761132 24.62248767 166.87890625 25.08984375 C174.69080861 24.6396629 180.01690628 21.30274222 185.44140625 15.90234375 C186.57643225 14.81990271 187.7118444 13.73786642 188.84765625 12.65625 C189.85923253 11.6769777 190.86979385 10.69665482 191.87890625 9.71484375 C202.52458886 -0.61400307 216.05178306 -5.10508739 230.75390625 -5.72265625 C248.16095787 -5.18812729 261.51064117 1.82845912 273.87890625 13.71484375 C280.32819995 19.9061657 285.65761132 24.62248767 294.87890625 25.08984375 C306.38499476 24.44318374 312.97934433 16.53893153 320.7109375 8.90625 C330.64896682 -0.37763056 344.92560299 -5.15975254 358.31640625 -5.66015625 C364.01893587 -5.44792618 367.44027493 -3.56393965 371.69140625 0.21484375 C375.57477388 4.65297818 375.220554 9.11099525 375.15234375 14.765625 C374.77754435 18.80810424 373.70729741 20.81392974 370.87890625 23.71484375 C366.42508632 27.12628029 363.05627653 27.92900155 357.50390625 28.58984375 C347.29272803 29.97697869 341.95661968 35.51928857 335.03027344 42.67211914 C324.33790053 53.51867324 309.72849217 58.51810789 294.75390625 58.96484375 C277.75797538 58.77015955 264.87242238 52.4200542 252.87890625 40.71484375 C243.40522937 31.50618745 243.40522937 31.50618745 230.87890625 28.33984375 C220.07246735 28.90749716 214.04817665 35.60206811 206.734375 42.8359375 C194.75042656 54.2418105 179.67933369 59.11290134 163.34375 58.92578125 C147.68811479 57.97267606 135.91371154 51.4843893 124.87890625 40.71484375 C115.40522937 31.50618745 115.40522937 31.50618745 102.87890625 28.33984375 C91.23708647 28.99413207 84.60309154 37.14849445 76.75390625 44.78125 C65.35737189 55.39427263 50.68802012 59.40405521 35.35546875 58.99609375 C19.64662126 57.72526564 8.02422465 51.59224584 -3.12109375 40.71484375 C-10.27543833 33.81133747 -15.52539838 29.0646629 -25.62109375 28.33984375 C-30.58491231 27.91044768 -34.41235049 26.0376092 -38.12109375 22.71484375 C-40.88029455 18.99371973 -41.53132899 16.31891512 -41.49609375 11.71484375 C-41.50382812 10.70421875 -41.5115625 9.69359375 -41.51953125 8.65234375 C-40.8898356 4.00988169 -38.73704637 0.86513908 -35.12109375 -2.03515625 C-25.34394002 -9.36802155 -10.35147967 -4.26237398 0 0 Z" fill={color} transform="translate(89.12109375,214.28515625)"/>
      {/* Middle Line */}
      <path d="M0 0 C0.67372147 -0.00581376 1.34744293 -0.01162753 2.0415802 -0.01761746 C4.29769864 -0.03220815 6.55272751 -0.01833775 8.80883789 -0.00457001 C10.44316667 -0.00917932 12.0774913 -0.01553244 13.71180725 -0.02347898 C18.20180347 -0.04019136 22.69146001 -0.03191731 27.18145752 -0.01953411 C32.02407137 -0.01049375 36.86662632 -0.02444831 41.70922852 -0.0354538 C51.19547698 -0.05325443 60.68159895 -0.04939215 70.1678524 -0.03780323 C77.87647923 -0.02877527 85.58507057 -0.02754215 93.29370117 -0.0318985 C94.39019895 -0.03251143 95.48669672 -0.03312436 96.6164217 -0.03375587 C98.84383012 -0.03503475 101.07123853 -0.0363316 103.29864693 -0.03764623 C124.19251875 -0.04905656 145.08632042 -0.03593122 165.98018074 -0.01444477 C183.91398702 0.00342661 201.84768973 0.00032263 219.78149414 -0.01811981 C240.59982509 -0.03951852 261.41809452 -0.04795788 282.23643494 -0.03567076 C284.45571898 -0.03439654 286.67500304 -0.03313906 288.89428711 -0.0318985 C289.98626058 -0.0312814 291.07823404 -0.03066429 292.20329762 -0.03002849 C299.90402005 -0.0265726 307.60470352 -0.0324091 315.30541992 -0.04181671 C324.68809716 -0.05302696 334.07064051 -0.05001714 343.45330238 -0.02869374 C348.24189245 -0.01817023 353.03025917 -0.01408365 357.81884766 -0.02729034 C362.2008803 -0.03919313 366.58248217 -0.03268673 370.96447563 -0.01138014 C372.55119843 -0.00690509 374.13795749 -0.00920057 375.72465706 -0.01888329 C377.87962005 -0.03102691 380.03310282 -0.01859521 382.18798828 0 C383.38541153 0.00064941 384.58283478 0.00129882 385.81654358 0.00196791 C390.91119161 0.78136623 393.98388865 3.33483247 397.46899414 7.00336456 C399.86702989 12.16836465 399.84780949 16.90359336 399.09399414 22.50336456 C396.78330437 27.48023484 393.80811455 29.81086951 389.09399414 32.50336456 C385.81654358 33.00476122 385.81654358 33.00476122 382.18798828 33.00672913 C381.51426682 33.01254289 380.84054535 33.01835665 380.14640808 33.02434659 C377.89028964 33.03893727 375.63526077 33.02506688 373.37915039 33.01129913 C371.74482162 33.01590845 370.11049699 33.02226157 368.47618103 33.03020811 C363.98618481 33.04692049 359.49652827 33.03864643 355.00653076 33.02626324 C350.16391691 33.01722287 345.32136196 33.03117744 340.47875977 33.04218292 C330.9925113 33.05998356 321.50638933 33.05612127 312.02013588 33.04453236 C304.31150905 33.03550439 296.60291771 33.03427128 288.89428711 33.03862762 C287.24954045 33.03954702 287.24954045 33.03954702 285.57156658 33.04048499 C283.34415816 33.04176388 281.11674975 33.04306073 278.88934135 33.04437536 C257.99546953 33.05578568 237.10166786 33.04266035 216.20780754 33.02117389 C198.27400126 33.00330251 180.34029855 33.00640649 162.40649414 33.02484894 C141.58816319 33.04624765 120.76989376 33.05468701 99.95155334 33.04239988 C97.7322693 33.04112567 95.51298524 33.03986818 93.29370117 33.03862762 C92.20172771 33.03801052 91.10975424 33.03739342 89.98469067 33.03675762 C82.28396823 33.03330172 74.58328476 33.03913823 66.88256836 33.04854584 C57.49989112 33.05975609 48.11734777 33.05674626 38.7346859 33.03542286 C33.94609583 33.02489935 29.15772911 33.02081278 24.36914062 33.03401947 C19.98710798 33.04592226 15.60550611 33.03941585 11.22351265 33.01810926 C9.63678985 33.01363421 8.05003079 33.0159297 6.46333122 33.02561241 C4.30836823 33.03775604 2.15488546 33.02532434 0 33.00672913 C-1.19742325 33.00607972 -2.3948465 33.00543031 -3.6285553 33.00476122 C-8.72320333 32.22536289 -11.79590037 29.67189665 -15.28100586 26.00336456 C-17.67904161 20.83836448 -17.65982121 16.10313576 -16.90600586 10.50336456 C-13.49255297 3.15131218 -7.9695115 0.00432218 0 0 Z" fill={color} transform="translate(64.906005859375,288.4966354370117)"/>
      {/* Bottom Bun */}
      <path d="M0 0 C1.40251469 -0.00417941 2.80502599 -0.00966025 4.20753109 -0.01631981 C8.03837352 -0.0307136 11.8689997 -0.02654883 15.69985366 -0.019153 C19.84038902 -0.01440851 23.98087845 -0.02694248 28.12139893 -0.03717041 C36.22410715 -0.05433881 44.32673775 -0.05520248 52.42945944 -0.04995751 C59.01760828 -0.04591086 65.60573424 -0.04736524 72.19388199 -0.05270576 C73.60208686 -0.0538284 73.60208686 -0.0538284 75.03874031 -0.05497371 C76.9461162 -0.05650524 78.85349209 -0.05804359 80.76086797 -0.05958868 C98.63524049 -0.07330668 116.5095692 -0.06788099 134.38394071 -0.05640347 C150.72262064 -0.04647222 167.0611873 -0.05941112 183.39984976 -0.08333766 C200.19222034 -0.1077426 216.9845382 -0.11733307 233.77692616 -0.11068493 C243.19824017 -0.10719576 252.6194671 -0.10940479 262.04076767 -0.12693596 C270.06100686 -0.14167539 278.08109763 -0.14227066 286.10133396 -0.12486505 C290.18997103 -0.11636692 294.27834317 -0.11417623 298.36696625 -0.1295166 C302.11632495 -0.14340943 305.8651929 -0.13854229 309.61452354 -0.11927737 C311.59944856 -0.11376841 313.58439886 -0.12775047 315.56927574 -0.14263147 C330.20069446 -0.02317438 341.05626763 4.80602234 351.7204895 14.70018005 C361.71339988 25.25872687 364.48488732 36.80595929 364.39016724 50.91795349 C363.97938694 65.04034244 358.13337051 76.11633732 347.9079895 85.79393005 C336.90922961 94.84129706 325.87594285 96.84050417 311.940979 96.77536011 C310.53846432 96.77953952 309.13595301 96.78502036 307.73344791 96.79167992 C303.90260548 96.8060737 300.07197931 96.80190894 296.24112535 96.79451311 C292.10058999 96.78976862 287.96010055 96.80230259 283.81958008 96.81253052 C275.71687186 96.82969892 267.61424125 96.83056258 259.51151957 96.82531761 C252.92337073 96.82127096 246.33524477 96.82272535 239.74709702 96.82806587 C238.33889214 96.82918851 238.33889214 96.82918851 236.90223869 96.83033382 C234.9948628 96.83186535 233.08748691 96.83340369 231.18011104 96.83494879 C213.30573852 96.84866679 195.43140981 96.8432411 177.55703829 96.83176357 C161.21835837 96.82183233 144.8797917 96.83477123 128.54112925 96.85869776 C111.74875866 96.88310271 94.9564408 96.89269318 78.16405284 96.88604504 C68.74273883 96.88255587 59.3215119 96.8847649 49.90021133 96.90229607 C41.87997215 96.9170355 33.85988137 96.91763077 25.83964504 96.90022516 C21.75100798 96.89172703 17.66263584 96.88953634 13.57401276 96.90487671 C9.82465406 96.91876954 6.0757861 96.9139024 2.32645546 96.89463747 C0.34153044 96.88912852 -1.64341985 96.90311057 -3.62829673 96.91799158 C-18.25971546 96.79853449 -29.11528862 91.96933777 -39.7795105 82.07518005 C-49.77242087 71.51663324 -52.54390831 59.96940082 -52.44918823 45.85740662 C-52.03840793 31.73501767 -46.1923915 20.65902279 -35.9670105 10.98143005 C-24.96825061 1.93406305 -13.93496385 -0.06514406 0 0 Z M-16.0295105 38.45018005 C-19.4566687 43.48381866 -19.6871971 47.36660557 -19.0295105 53.38768005 C-16.68158392 58.26414295 -13.74190196 60.79105619 -9.0295105 63.38768005 C-5.45809875 64.29838886 -2.11918882 64.51435929 1.55814743 64.51910782 C2.67723897 64.52294896 3.7963305 64.52679011 4.94933391 64.53074765 C6.17373408 64.52988117 7.39813425 64.52901469 8.65963745 64.52812195 C10.61662563 64.53257863 10.61662563 64.53257863 12.61314893 64.53712535 C16.23298423 64.54518432 19.85279969 64.5469843 23.4726429 64.54772282 C27.37733618 64.54957528 31.2820192 64.55712356 35.18670654 64.56385803 C43.72393115 64.57743376 52.26115106 64.58346481 60.79838467 64.58786869 C66.12981452 64.59063224 71.46124257 64.59486978 76.7926712 64.59937286 C91.55621095 64.61156423 106.31974924 64.62186401 121.08329391 64.62524796 C122.50033782 64.6255773 122.50033782 64.6255773 123.94600888 64.62591331 C125.36642446 64.62624072 125.36642446 64.62624072 126.81553531 64.62657475 C128.73437421 64.62701822 130.6532131 64.62746478 132.572052 64.62791443 C133.99976464 64.62824657 133.99976464 64.62824657 135.45631996 64.62858543 C150.87907595 64.63253347 166.3017847 64.64998826 181.72452244 64.67327395 C197.56184987 64.69699246 213.39915359 64.70945002 229.23649907 64.71061587 C238.12737556 64.71153232 247.01819047 64.71727706 255.90904999 64.73543549 C263.47968139 64.75084316 271.05023218 64.75595298 278.62087628 64.74769738 C282.48224484 64.74379332 286.34345111 64.7447085 290.20479965 64.75875473 C294.39445239 64.77385563 298.58374014 64.76562003 302.77340698 64.75517273 C303.98888427 64.76322913 305.20436155 64.77128554 306.45667148 64.77958608 C317.25311015 64.76986043 317.25311015 64.76986043 326.58690715 59.93574643 C330.65574852 55.19939005 331.32645058 51.98901218 331.24783325 45.92674255 C330.83672506 42.16307603 329.4876259 40.16977818 326.9704895 37.38768005 C321.53353959 33.107528 317.16001467 32.26500364 310.38283157 32.25625229 C309.26374004 32.25241114 308.1446485 32.24857 306.9916451 32.24461246 C305.76724493 32.24547894 304.54284476 32.24634542 303.28134155 32.24723816 C301.97668277 32.24426704 300.67202398 32.24129591 299.32783008 32.23823476 C295.70799477 32.23017578 292.08817932 32.2283758 288.46833611 32.22763729 C284.56364283 32.22578483 280.6589598 32.21823655 276.75427246 32.21150208 C268.21704785 32.19792635 259.67982794 32.1918953 251.14259434 32.18749142 C245.81116448 32.18472787 240.47973643 32.18049032 235.1483078 32.17598724 C220.38476806 32.16379587 205.62122976 32.1534961 190.85768509 32.15011215 C189.91298915 32.14989259 188.96829321 32.14967302 187.99497013 32.1494468 C187.04802641 32.14922852 186.10108268 32.14901024 185.1254437 32.14878535 C183.2066048 32.14834189 181.2877659 32.14789532 179.368927 32.14744568 C177.94121436 32.14711353 177.94121436 32.14711353 176.48465905 32.14677468 C161.06190305 32.14282664 145.63919431 32.12537185 130.21645656 32.10208616 C114.37912913 32.07836765 98.54182541 32.06591008 82.70447993 32.06474423 C73.81360345 32.06382779 64.92278853 32.05808305 56.03192902 32.03992462 C48.46129762 32.02451695 40.89074682 32.01940713 33.32010272 32.02766272 C29.45873416 32.03156679 25.5975279 32.03065161 21.73617935 32.01660538 C17.54652662 32.00150448 13.35723887 32.00974008 9.16757202 32.02018738 C7.95209474 32.01213097 6.73661746 32.00407457 5.48430753 31.99577403 C-2.33366451 32.04138553 -10.59134838 32.1198586 -16.0295105 38.45018005 Z" fill={color} transform="translate(100.02951049804688,336.61231994628906)"/>
    </svg>
  );
}

// Urban Hero Section
function UrbanHero() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Reduced parallax on mobile for better performance
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 100 : 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.95 : 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -5]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: DARK_BG }}
    >
      {/* Subtle grid background - hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${FLAT_BLUE} 1px, transparent 1px),
                linear-gradient(90deg, ${FLAT_BLUE} 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px"
            }}
          />
        </div>
      )}
      
      {/* Floating gradient orbs - Simplified on mobile */}
      <div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] opacity-20 md:opacity-25"
        style={{ background: FLAT_BLUE, top: "-15%", right: "-15%" }}
      />
      {!isMobile && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: FLAT_BEIGE, bottom: "-10%", left: "-5%" }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div 
        style={!isMobile ? { y, opacity, scale, rotate } : { opacity }} 
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Case Study Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <motion.div 
                className="w-12 h-[1px]"
                style={{ background: FLAT_BLUE }}
                initial={{ scaleX: 0 }}
                animate={isLoaded ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span 
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
                style={{ color: FLAT_BEIGE }}
              >
                Case Study
              </span>
            </motion.div>

            {/* Main Title with Logo - Desktop: Side by side, Mobile: Stacked */}
            <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
              {/* Title Section */}
              <div className="text-center lg:text-left flex-1">
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: isMobile ? 60 : 200, opacity: 0, skewY: isMobile ? 0 : 10 }}
                    animate={isLoaded ? { y: 0, opacity: 1, skewY: 0 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[18vw] md:text-[14vw] lg:text-[10vw] xl:text-[9vw] font-black leading-[0.82] tracking-[-0.04em]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    FLAT
                  </motion.h1>
                </div>
                
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: isMobile ? 60 : 200, opacity: 0, skewY: isMobile ? 0 : 10 }}
                    animate={isLoaded ? { y: 0, opacity: 1, skewY: 0 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={!isMobile ? { scale: 1.02, x: 10 } : undefined}
                    className="text-[18vw] md:text-[14vw] lg:text-[10vw] xl:text-[9vw] font-black leading-[0.82] tracking-[-0.04em] cursor-default"
                    style={{
                      fontFamily: '"Bricolage Grotesque", sans-serif',
                      WebkitTextStroke: `3px ${FLAT_BLUE}`,
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    BURGER
                  </motion.h1>
                </div>
              </div>
              
              {/* Logo - Always visible, bigger on desktop */}
              <motion.div
                className="flex items-center justify-center relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {/* Glow effect behind logo */}
                <div 
                  className="absolute w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full blur-[40px] md:blur-[60px] opacity-30 md:opacity-40"
                  style={{ background: FLAT_BLUE }}
                />
                <motion.div
                  animate={!isMobile ? { 
                    y: [-8, 8, -8],
                    rotate: [-2, 2, -2],
                  } : undefined}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] flex items-center justify-center"
                  style={{ 
                    filter: isMobile 
                      ? `drop-shadow(0 0 20px ${FLAT_BLUE}60)` 
                      : `drop-shadow(0 0 40px ${FLAT_BLUE}80) drop-shadow(0 0 80px ${FLAT_BLUE}40)` 
                  }}
                >
                  <FlatBurgerLogo 
                    color={OFF_WHITE} 
                    className="w-full h-full" 
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Description & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <p className="text-lg md:text-xl max-w-lg leading-relaxed opacity-60" style={{ color: OFF_WHITE }}>
                Complete brand identity for Belgrade's boldest street food experience. 
                Urban. Raw. Unapologetically delicious.
              </p>
              
              <div className="flex gap-10">
                {[
                  { label: "Year", value: "2024" },
                  { label: "Services", value: "Branding" },
                  { label: "Location", value: "Belgrade" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    className="text-right"
                  >
                    <div className="text-xs uppercase tracking-wider mb-1 opacity-40" style={{ color: OFF_WHITE }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: FLAT_BEIGE }}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40" style={{ color: OFF_WHITE }}>
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Journal.rs Press Feature Section - PROMINENT
function JournalFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-16 md:py-32 relative overflow-hidden" style={{ background: FLAT_BEIGE }}>
      {/* Decorative elements - hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${FLAT_BLUE} 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.a
            href="https://www.journal.rs/lifestyle/gastro/flat-burger-street-food-beograd/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
            className="block group"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
              {/* Featured In Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.1, ease: "easeOut" }}
                className="shrink-0"
              >
                <div 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-center md:group-hover:scale-105 transition-transform duration-300"
                  style={{ background: FLAT_BLUE }}
                >
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1 md:mb-2 opacity-80" style={{ color: FLAT_BEIGE }}>
                    Featured In
                  </span>
                  <span 
                    className="text-2xl md:text-4xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Journal.rs
                  </span>
                  <span className="text-[10px] md:text-xs mt-1 md:mt-2 opacity-60" style={{ color: OFF_WHITE }}>
                    Aug 2024
                  </span>
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span 
                    className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider mb-4 md:mb-6 font-medium"
                    style={{ background: `${FLAT_BLUE}15`, color: FLAT_BLUE }}
                  >
                    Press Feature
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
                >
                  "Street-food mapa Beograda dobila je novog igrača – 
                  <span style={{ color: FLAT_BLUE }}> Flat Burger je stigao u grad</span>"
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-sm md:text-lg opacity-70 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0"
                  style={{ color: DARK_BG }}
                >
                  Featured as Belgrade's newest street food sensation, Flat Burger represents the new generation 
                  that will write the gastro-street history of this city.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 md:gap-3 font-semibold transition-all md:group-hover:gap-5"
                  style={{ color: FLAT_BLUE }}
                >
                  <span className="text-sm md:text-base">Read Full Article</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform md:group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// Logo Showcase Section - Fixed visibility
function LogoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const variants = [
    { bg: OFF_WHITE, logoColor: FLAT_BLUE, textColor: FLAT_BLUE, label: "Light" },
    { bg: FLAT_BEIGE, logoColor: DARK_BG, textColor: DARK_BG, label: "Brand Beige" },
    { bg: FLAT_BLUE, logoColor: OFF_WHITE, textColor: OFF_WHITE, label: "Brand Blue" },
    { bg: DARK_BG, logoColor: FLAT_BEIGE, textColor: FLAT_BEIGE, label: "Dark" },
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: "#e8e8e8" }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Logo System
              </span>
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Iconic in <span style={{ color: FLAT_BLUE }}>every context</span>
            </h2>
          </motion.div>
          
          {/* Logo grid - 2x2 on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div 
                  className="aspect-square rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center shadow-lg md:hover:scale-[1.02] md:hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: variant.bg }}
                >
                  <div className="mb-3 md:mb-4 w-[60px] h-[60px] md:w-[90px] md:h-[90px] flex items-center justify-center">
                    <FlatBurgerLogo color={variant.logoColor} className="w-full h-full" />
                  </div>
                  
                  <div 
                    className="text-base md:text-xl font-black tracking-tight text-center"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: variant.textColor }}
                  >
                    FLAT BURGER
                  </div>
                </div>
                
                <p className="text-center mt-2 md:mt-3 text-xs md:text-sm font-medium" style={{ color: DARK_BG }}>
                  {variant.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Process Section
interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    phase: "01",
    title: "Discovery",
    description: "Deep dive into Belgrade's street food culture and market positioning.",
    deliverables: ["Market Research", "Competitor Analysis", "Brand Strategy"],
  },
  {
    phase: "02",
    title: "Identity",
    description: "Crafting a visual language that speaks urban and premium.",
    deliverables: ["Logo System", "Color Palette", "Typography", "Guidelines"],
  },
  {
    phase: "03",
    title: "Digital",
    description: "Building a digital presence that matches the brand's energy.",
    deliverables: ["Website Design", "Social Assets", "Digital Applications"],
  },
  {
    phase: "04",
    title: "Content",
    description: "Creating and editing visuals for maximum impact on Instagram.",
    deliverables: ["Video Editing", "Photo Content", "Reels & Stories"],
  },
  {
    phase: "05",
    title: "Launch",
    description: "Bringing the brand to life across all channels.",
    deliverables: ["Press Features", "Social Launch", "Location Branding"],
  },
];

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                The Process
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <h2
                className="text-3xl md:text-6xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                From concept to <span style={{ color: FLAT_BEIGE }}>street corner</span>
              </h2>
              
              <p className="text-gray-400 max-w-md text-base md:text-lg">
                A comprehensive branding journey covering every touchpoint.
              </p>
            </div>
          </motion.div>
          
          {/* Process cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="group relative p-5 md:p-8 rounded-2xl border border-gray-800 md:hover:border-gray-600 md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="relative z-10">
                  <div className="text-sm font-bold uppercase tracking-wider mb-2 md:mb-3" style={{ color: FLAT_BLUE }}>
                    Phase {step.phase}
                  </div>
                  
                  <h3 
                    className="text-xl md:text-3xl font-bold mb-2 md:mb-3"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 md:mb-5 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {step.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium"
                        style={{ 
                          background: `${FLAT_BLUE}15`,
                          color: FLAT_BEIGE,
                          border: `1px solid ${FLAT_BLUE}30`
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Color & Typography Section
function ColorTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: OFF_WHITE }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Brand System
              </span>
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Colors that <span style={{ color: FLAT_BLUE }}>demand attention</span>
            </h2>
          </motion.div>
          
          {/* Colors */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BEIGE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-5xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Aa
                  </div>
                  <div className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] flex items-center justify-center">
                    <FlatBurgerLogo color={FLAT_BLUE} className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div 
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Warm Beige
                  </div>
                  <div className="font-mono text-xs md:text-sm opacity-60" style={{ color: FLAT_BLUE }}>
                    #FEEBCB
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BLUE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-5xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Aa
                  </div>
                  <div className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] flex items-center justify-center">
                    <FlatBurgerLogo color={OFF_WHITE} className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div 
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Bold Blue
                  </div>
                  <div className="font-mono text-xs md:text-sm opacity-60" style={{ color: OFF_WHITE }}>
                    #1C33C3
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-6 md:p-12 rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6" style={{ color: FLAT_BLUE }}>
              Primary Typeface
            </div>
            
            <div 
              className="text-2xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Bricolage Grotesque
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {["Light", "Regular", "Medium", "Bold", "Black"].map((weight, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2 md:pb-3">
                  <span 
                    className="text-base md:text-2xl"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: (i + 3) * 100, color: DARK_BG }}
                  >
                    {isMobile ? "Quick brown fox" : "The quick brown fox jumps"}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-400">{weight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Instagram Section - Bold & Creative
function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // The exact posts provided by user
  const instagramPostUrls: string[] = [
    "https://www.instagram.com/p/DQxGa6FDFlT/",
    "https://www.instagram.com/p/DSQYJtFDB96/",
    "https://www.instagram.com/p/DRuQwnQDGNI/",
    "https://www.instagram.com/p/DIMKKCesMch/",
    "https://www.instagram.com/p/DGgNQ3PMwcf/",
    "https://www.instagram.com/p/DFsia-DsduT/",
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48 relative overflow-hidden" style={{ background: DARK_BG }}>
      {/* Background elements - static on mobile */}
      <div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[200px] opacity-15 md:opacity-20 -top-20 md:-top-40 -right-20 md:-right-40"
        style={{ background: FLAT_BLUE }}
      />
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
              >
                <div className="w-10 md:w-16 h-[2px]" style={{ background: FLAT_BLUE }} />
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold" style={{ color: FLAT_BLUE }}>
                  Content We Created
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.5 : 1, delay: 0.2, ease: "easeOut" }}
                className="text-3xl md:text-6xl lg:text-7xl font-black leading-[0.95]"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                Live from
                <br />
                <span style={{ color: FLAT_BLUE }}>@flatburger.bg</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-base md:text-xl opacity-60 mt-4 md:mt-6 leading-relaxed"
                style={{ color: OFF_WHITE }}
              >
                Video content, reels, and visual stories we create for Flat Burger's Instagram presence.
              </motion.p>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex gap-6 md:gap-8"
            >
              {[
                { value: "100+", label: "Posts" },
                { value: "Video", label: "Content" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div 
                    className="text-2xl md:text-4xl font-black"
                    style={{ color: FLAT_BEIGE }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider mt-1" style={{ color: FLAT_BLUE }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <InstagramFeed username="flatburger.bg" limit={6} postUrls={instagramPostUrls} />
        </div>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const results = [
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      metric: "Journal.rs", 
      label: "Press Feature", 
      desc: "Featured as Belgrade's hottest street food" 
    },
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
        </svg>
      ),
      metric: "@flatburger.bg", 
      label: "Instagram", 
      desc: "Active with engaging video content" 
    },
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      metric: "Dečanska 4", 
      label: "Location", 
      desc: "Fully branded space in central Belgrade" 
    },
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 md:w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-xs md:text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Results
              </span>
              <div className="w-8 md:w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Successfully <span style={{ color: FLAT_BEIGE }}>launched</span>
            </h2>
          </motion.div>
          
          {/* Results grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="text-center p-6 md:p-10 rounded-2xl border border-gray-800 md:hover:border-gray-600 md:hover:scale-[1.02] transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-4 md:mb-6" style={{ background: `${FLAT_BLUE}20`, color: FLAT_BLUE }}>
                  {result.icon}
                </div>
                <div 
                  className="text-xl md:text-3xl font-black mb-2"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BEIGE }}
                >
                  {result.metric}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3" style={{ color: FLAT_BLUE }}>
                  {result.label}
                </div>
                <p className="text-gray-400 text-xs md:text-sm">{result.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48 overflow-hidden relative" style={{ background: FLAT_BLUE }}>
      {/* Background pattern - hidden on mobile */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${OFF_WHITE} 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      )}
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
          >
            <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] mx-auto mb-6 md:mb-8 flex items-center justify-center">
              <FlatBurgerLogo color={OFF_WHITE} className="w-full h-full" />
            </div>
            
            <h2 
              className="text-3xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-[0.95]"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Ready to build
              <br />
              your brand?
            </h2>
            
            <p className="text-base md:text-2xl mb-8 md:mb-10 opacity-70" style={{ color: FLAT_BEIGE }}>
              Let's create an identity that dominates the streets.
            </p>
            
            <Link
              to="/book"
              className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold uppercase tracking-wider rounded-full shadow-xl active:scale-95 md:hover:scale-[1.03] transition-transform duration-200"
              style={{ background: OFF_WHITE, color: FLAT_BLUE }}
            >
              <span>Start Your Project</span>
              <svg 
                className="w-4 h-4 md:w-5 md:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Main component
export default function FlatBurger() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: isMobile ? 200 : 100, 
    damping: isMobile ? 50 : 30 
  });
  
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: DARK_BG }}>
      {/* Scroll progress - simplified on mobile */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${FLAT_BLUE}, ${FLAT_BEIGE})` }}
      />
      
      <Navbar />
      
      <UrbanHero />
      <JournalFeature />
      <LogoShowcase />
      <ProcessSection />
      <ColorTypography />
      <InstagramSection />
      <ResultsSection />
      <CTASection />
    </div>
  );
}
