// Earth function
function Earth(position, radius){
	this.position = position;
	this.radius = radius;
	this.rotation = 0;
	this.animation = 0;
	this.landwidth = 250 * 1.8;
	this.speed = 0.3;
}

Earth.prototype.update = function() {
	// Animate earth rotation
	this.animation = (this.animation + this.speed) % this.landwidth;
};

Earth.prototype.draw = function() {
	// Draw earth
	context.save();

	context.translate(this.position.x, this.position.y);
	context.rotate(this.rotation / 180 * Math.PI);

	// Black background
	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
	context.fillStyle = '#000000';
	context.fill();
	context.closePath();

	// Atmosphere
	context.beginPath();
	context.arc(0, 0, this.radius * 1.06, 0, 2 * Math.PI, false);
	context.strokeStyle = '#6E9FCA';
	context.lineWidth = 1 / Camera.zoom;
	context.stroke();
	context.closePath();

	// Sea rim
	context.beginPath();
	context.arc(0, 0, this.radius * 0.99, 0, 2 * Math.PI, false);
	context.strokeStyle = '#6E9FCA';
	context.stroke();
	context.closePath();

	// Sea color
	context.beginPath();
	context.arc(0, 0, this.radius * 0.98, 0, 2 * Math.PI, false);
	context.strokeStyle = '#164163';
	context.lineWidth = 2 / Camera.zoom;
	context.stroke();
	context.closePath();

	// Player orbit
	context.save();
	context.beginPath();
	context.arc(0, 0, this.radius + 35, 0, 2 * Math.PI, false);
	context.strokeStyle = '#666666';
	context.setLineDash([8, 16]);
	context.lineWidth = 1 / Camera.zoom;
	context.stroke();
	context.closePath();
	context.restore();

	// Land clip
	context.beginPath();
	context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);

	context.clip();

	// Draw 2 times earth continents for animation
	this.land(this.animation, 0);
	this.land(this.animation + this.landwidth, 0);

	context.closePath();

	context.restore();
};

// Continents points
Earth.prototype.land = function(x, y){
	context.save();
	context.rotate(Math.PI / 3);
	context.translate(this.radius-x, -this.radius - y);
	context.scale(1.8,1.8);
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(247,0);
	context.lineTo(247,122);
	context.lineTo(0,122);
	context.closePath();
	context.clip();
	context.strokeStyle = '#8B7D6B';
	context.lineCap = 'butt';
	context.lineJoin = 'miter';
	context.miterLimit = 4;
	context.save();
	context.lineWidth = 0.5 / Camera.zoom;
	context.beginPath();
	context.moveTo(64.3429,54.5878);
	context.lineTo(62.4218,61.2466);
	context.lineTo(62.8272,60.542);
	context.lineTo(61.7697,62.4621);
	context.lineTo(69.6127,73.525);
	context.lineTo(67.0042,88.6218);
	context.lineTo(67.7269,97.4122);
	context.lineTo(72.8732,98.0112);
	context.lineTo(68.379,96.8837);
	context.lineTo(72.7675,92.8144);
	context.lineTo(71.4633,91.916);
	context.lineTo(73.3315,88.1638);
	context.lineTo(74.5123,86.825);
	context.lineTo(78.2488,86.3494);
	context.lineTo(78.3369,86.0499);
	context.lineTo(75.6227,79.0564);
	context.lineTo(78.707,76.4844);
	context.lineTo(78.1783,83.5484);
	context.lineTo(80.9982,83.4427);
	context.lineTo(80.4871,83.1785);
	context.lineTo(82.6902,80.5185);
	context.lineTo(83.5538,80.5009);
	context.lineTo(85.281,76.9777);
	context.lineTo(89.458,75.1632);
	context.lineTo(93.8466,63.0611);
	context.lineTo(86.7086,62.0746);
	context.lineTo(87.4488,61.2819);
	context.lineTo(85.14,60.9471);
	context.lineTo(85.1047,61.1585);
	context.lineTo(84.6465,60.5948);
	context.lineTo(80.9806,61.0352);
	context.lineTo(75.2349,64.0123);
	context.lineTo(75.5346,63.2372);
	context.lineTo(73.2257,63.7833);
	context.lineTo(73.4549,62.5502);
	context.lineTo(71.0227,60.6477);
	context.lineTo(75.5169,58.4104);
	context.lineTo(77.015,61.4228);
	context.lineTo(82.5844,59.3969);
	context.lineTo(82.7607,56.825);
	context.lineTo(78.0549,55.9971);
	context.lineTo(74.5652,51.7516);
	context.lineTo(73.1905,52.3153);
	context.lineTo(69.1368,51.5931);
	context.lineTo(68.3966,53.1961);
	context.lineTo(66.7751,51.4698);
	context.lineTo(66.8985,54.1826);
	context.lineTo(64.3429,54.5878);
	context.closePath();
	context.moveTo(9.3752,18.8597);
	context.lineTo(5.4062,20.1838);
	context.lineTo(5.4943,20.448);
	context.lineTo(9.3752,18.8597);
	context.closePath();
	context.moveTo(9.3902,18.8526);
	context.lineTo(9.3752,18.8597);
	context.lineTo(9.407,18.8626);
	context.lineTo(9.3902,18.8526);
	context.closePath();
	context.moveTo(10.5173,17.6999);
	context.lineTo(13.1962,15.7446);
	context.lineTo(12.1388,17.7352);
	context.lineTo(15.7342,16.5725);
	context.lineTo(24.1764,19.6553);
	context.lineTo(23.8768,18.387);
	context.lineTo(24.3174,19.303);
	context.lineTo(24.9166,18.7569);
	context.lineTo(24.5465,19.6553);
	context.lineTo(25.9389,20.1838);
	context.lineTo(28.4063,22.421);
	context.lineTo(28.6178,23.8303);
	context.lineTo(31.3496,25.3277);
	context.lineTo(31.9136,31.8984);
	context.lineTo(33.1297,31.3876);
	context.lineTo(34.8393,34.0652);
	context.lineTo(34.7864,34.1004);
	context.lineTo(33.0063,32.4269);
	context.lineTo(41.6072,43.2783);
	context.lineTo(41.9068,43.1198);
	context.lineTo(37.2539,35.9501);
	context.lineTo(45.5022,45.956);
	context.lineTo(62.4042,54.1826);
	context.lineTo(61.1705,52.9847);
	context.lineTo(60.0249,49.1268);
	context.lineTo(56.2885,48.2636);
	context.lineTo(56.5,45.727);
	context.lineTo(55.8831,45.1985);
	context.lineTo(54.949,47.1186);
	context.lineTo(51.3007,46.8896);
	context.lineTo(49.3796,44.0006);
	context.lineTo(55.3544,34.6465);
	context.lineTo(54.4908,37.835);
	context.lineTo(57.0463,36.2848);
	context.lineTo(57.8394,36.8485);
	context.lineTo(57.3283,37.6941);
	context.lineTo(59.9191,37.7822);
	context.lineTo(73.5782,27.3711);
	context.lineTo(72.7675,25.7504);
	context.lineTo(73.7192,24.993);
	context.lineTo(70.0004,25.5743);
	context.lineTo(79.7645,23.0376);
	context.lineTo(78.1254,21.2936);
	context.lineTo(78.3898,20.9765);
	context.lineTo(73.402,17.0834);
	context.lineTo(69.5951,16.5549);
	context.lineTo(64.2196,15.5332);
	context.lineTo(64.995,16.9953);
	context.lineTo(64.2019,20.6066);
	context.lineTo(61.5759,23.7951);
	context.lineTo(61.6287,23.5484);
	context.lineTo(60.4479,20.9765);
	context.lineTo(58.7383,21.4345);
	context.lineTo(53.9268,19.8843);
	context.lineTo(51.7766,15.6213);
	context.lineTo(52.6225,15.3864);
	context.lineTo(53.0455,15.2689);
	context.lineTo(50.8777,14.1239);
	context.lineTo(56.5,14.3001);
	context.lineTo(55.1429,11.1644);
	context.lineTo(52.552,8.751);
	context.lineTo(52.3758,7.2889);
	context.lineTo(51.3359,10.1075);
	context.lineTo(53.6272,11.2525);
	context.lineTo(43.1052,11.3758);
	context.lineTo(43.2991,12.5032);
	context.lineTo(37.8002,11.5696);
	context.lineTo(38.2761,10.9883);
	context.lineTo(24.7228,10.8826);
	context.lineTo(24.476,11.9219);
	context.lineTo(1.9694,11.094);
	context.lineTo(7.9794,12.1157);
	context.lineTo(7.9617,12.5737);
	context.lineTo(1,13.1022);
	context.lineTo(5.741,13.7363);
	context.lineTo(7.1827,14.3738);
	context.lineTo(5.1065,17.9818);
	context.lineTo(9.7242,17.4005);
	context.lineTo(8.5257,18.3165);
	context.lineTo(9.3902,18.8526);
	context.lineTo(10.8874,18.017);
	context.lineTo(10.5173,17.6999);
	context.closePath();
	context.moveTo(62.8977,53.108);
	context.lineTo(62.9224,53.0725);
	context.lineTo(62.8448,53.0376);
	context.lineTo(62.7831,53.1131);
	context.lineTo(62.8977,53.108);
	context.closePath();
	context.moveTo(219.6864,26.2789);
	context.lineTo(219.8979,24.4645);
	context.lineTo(220.7615,24.5702);
	context.lineTo(219.5278,21.8925);
	context.lineTo(219.2458,21.963);
	context.lineTo(219.2458,26.9659);
	context.lineTo(219.8979,26.3846);
	context.lineTo(219.6864,26.2789);
	context.closePath();
	context.moveTo(193.4962,64.0299);
	context.lineTo(199.3652,65.4392);
	context.lineTo(199.7177,64.8579);
	context.lineTo(193.4962,64.0299);
	context.closePath();
	context.moveTo(111.9118,22.8967);
	context.lineTo(112.37,23.1257);
	context.lineTo(114.626,22.3506);
	context.lineTo(114.9785,20.7827);
	context.lineTo(114.5908,20.5361);
	context.lineTo(112.9164,22.192);
	context.lineTo(112.8635,22.3858);
	context.lineTo(112.6697,21.963);
	context.lineTo(111.9118,22.8967);
	context.closePath();
	context.moveTo(205.9921,59.8197);
	context.lineTo(204.5293,60.2425);
	context.lineTo(204.2472,59.1679);
	context.lineTo(207.0848,58.6747);
	context.lineTo(203.7009,59.1503);
	context.lineTo(203.4013,63.3605);
	context.lineTo(203.7361,63.431);
	context.lineTo(204.0534,61.3523);
	context.lineTo(204.2472,61.4404);
	context.lineTo(204.8994,62.8497);
	context.lineTo(205.6396,62.4797);
	context.lineTo(204.8817,60.8238);
	context.lineTo(205.9921,59.8197);
	context.closePath();
	context.moveTo(211.4962,35.483);
	context.lineTo(214.3285,35.0341);
	context.lineTo(214.6987,35.862);
	context.lineTo(219.0519,31.1057);
	context.lineTo(217.783,30.8591);
	context.lineTo(216.6198,33.1844);
	context.lineTo(211.4962,35.483);
	context.closePath();
	context.moveTo(211.4962,35.483);
	context.lineTo(211.4381,35.4921);
	context.lineTo(211.4962,35.483);
	context.closePath();
	context.moveTo(186.2525,55.5214);
	context.lineTo(192.3859,63.202);
	context.lineTo(192.3592,63.3347);
	context.lineTo(192.2272,61.0352);
	context.lineTo(186.2525,55.5214);
	context.closePath();
	context.moveTo(115.6835,20.1838);
	context.lineTo(117.3755,21.9454);
	context.lineTo(116.8996,23.249);
	context.lineTo(116.0301,23.5895);
	context.lineTo(115.6835,23.9888);
	context.lineTo(119.3847,23.4604);
	context.lineTo(117.0053,19.8843);
	context.lineTo(117.8161,18.8097);
	context.lineTo(115.2252,18.6512);
	context.lineTo(114.9432,20.448);
	context.lineTo(115.6835,20.1838);
	context.closePath();
	context.moveTo(225.2734,66.9718);
	context.lineTo(222.665,64.4351);
	context.lineTo(223.4405,63.9242);
	context.lineTo(215.6151,61.0176);
	context.lineTo(211.632,60.2249);
	context.lineTo(214.2052,62.374);
	context.lineTo(225.2734,66.9718);
	context.closePath();
	context.moveTo(200.2112,62.0922);
	context.lineTo(201.2687,59.5555);
	context.lineTo(202.661,58.6747);
	context.lineTo(201.4097,56.8426);
	context.lineTo(202.9783,55.8561);
	context.lineTo(201.7798,54.7639);
	context.lineTo(196.0871,58.7099);
	context.lineTo(198.0786,61.5461);
	context.lineTo(199.9821,61.1057);
	context.lineTo(200.2112,61.4052);
	context.lineTo(200.2112,62.0922);
	context.closePath();
	context.moveTo(153.7174,68.0992);
	context.lineTo(149.8576,76.1145);
	context.lineTo(152.5894,76.2907);
	context.lineTo(154.5634,70.3893);
	context.lineTo(154.0699,67.9935);
	context.lineTo(153.7174,68.0992);
	context.closePath();
	context.moveTo(46.0309,10.1251);
	context.lineTo(38.188,8.4339);
	context.lineTo(38.8225,7.7645);
	context.lineTo(36.8309,7.9759);
	context.lineTo(37.7826,7.5708);
	context.lineTo(32.037,7.148);
	context.lineTo(30.909,8.6806);
	context.lineTo(36.0906,7.9231);
	context.lineTo(35.3152,8.8567);
	context.lineTo(35.8615,9.6671);
	context.lineTo(40.3911,9.6671);
	context.lineTo(40.3911,10.037);
	context.lineTo(36.5136,10.037);
	context.lineTo(36.496,10.3893);
	context.lineTo(46.0309,10.1251);
	context.closePath();
	context.moveTo(62.1425,7.8427);
	context.lineTo(58.5973,8.1345);
	context.lineTo(59.0732,9.4909);
	context.lineTo(58.985,7.3065);
	context.lineTo(56.4471,7.8526);
	context.lineTo(55.7597,8.8567);
	context.lineTo(56.688,9.4909);
	context.lineTo(56.4647,9.5437);
	context.lineTo(70.3529,12.6089);
	context.lineTo(70.3353,12.7851);
	context.lineTo(66.969,13.6306);
	context.lineTo(72.3798,15.7974);
	context.lineTo(70.7759,14.6524);
	context.lineTo(73.8779,14.5291);
	context.lineTo(71.1813,13.0141);
	context.lineTo(74.248,13.5954);
	context.lineTo(75.9399,12.4504);
	context.lineTo(71.1284,11.0587);
	context.lineTo(71.9215,10.5302);
	context.lineTo(62.2985,7.4827);
	context.lineTo(62.1425,7.8427);
	context.lineTo(64.1314,8.293);
	context.lineTo(62.1425,7.8427);
	context.closePath();
	context.moveTo(56.0594,5.3511);
	context.lineTo(56.1298,5.5978);
	context.lineTo(64.1314,5.5625);
	context.lineTo(63.4088,5.0164);
	context.lineTo(73.3315,2.1274);
	context.lineTo(73.1376,1.9689);
	context.lineTo(74.8061,1.7457);
	context.lineTo(75.6051,1.3876);
	context.lineTo(55.5659,1.8456);
	context.lineTo(56.218,2.4093);
	context.lineTo(61.1529,2.6735);
	context.lineTo(51.3712,3.1491);
	context.lineTo(51.4064,3.3782);
	context.lineTo(59.0203,4.717);
	context.lineTo(56.0594,5.3511);
	context.closePath();
	context.moveTo(81.2802,12.0452);
	context.lineTo(88.2948,17.2419);
	context.lineTo(102.9761,10.3541);
	context.lineTo(101.7541,9.5555);
	context.lineTo(101.1432,9.1562);
	context.lineTo(105.6374,6.9542);
	context.lineTo(107.5057,2.3388);
	context.lineTo(103.6459,2.286);
	context.lineTo(103.8926,1.8456);
	context.lineTo(98.4113,1.5461);
	context.lineTo(101.3018,1);
	context.lineTo(72.6265,2.6207);
	context.lineTo(73.9484,3.2372);
	context.lineTo(68.1675,4.5056);
	context.lineTo(69.0839,5.0517);
	context.lineTo(80.4166,8.1873);
	context.lineTo(79.9407,8.9977);
	context.lineTo(82.8312,9.6142);
	context.lineTo(80.6275,10.5456);
	context.lineTo(81.2802,12.0452);
	context.closePath();
	context.moveTo(221.819,86.4903);
	context.lineTo(227.0183,80.8003);
	context.lineTo(221.2198,69.6671);
	context.lineTo(219.6512,67.2889);
	context.lineTo(218.4351,72.5561);
	context.lineTo(214.0818,69.9313);
	context.lineTo(204.8817,73.2607);
	context.lineTo(199.3652,75.5332);
	context.lineTo(201.2511,84.0417);
	context.lineTo(211.209,81.3464);
	context.lineTo(216.4964,82.421);
	context.lineTo(216.0557,83.9184);
	context.lineTo(217.2542,84.2178);
	context.lineTo(218.6994,86.2437);
	context.lineTo(221.819,86.4903);
	context.closePath();
	context.moveTo(184.3843,117.1597);
	context.lineTo(184.3314,116.8602);
	context.lineTo(200.5108,117.6177);
	context.lineTo(186.1468,113.2313);
	context.lineTo(187.4686,112.4034);
	context.lineTo(184.4019,111.3465);
	context.lineTo(188.6671,109.1444);
	context.lineTo(183.3797,109.3911);
	context.lineTo(187.2571,106.6782);
	context.lineTo(166.5129,110.1838);
	context.lineTo(165.8432,109.2501);
	context.lineTo(167.4823,107.5766);
	context.lineTo(157.7535,106.9601);
	context.lineTo(158.6171,106.3964);
	context.lineTo(152.6247,106.5549);
	context.lineTo(152.8714,107.4181);
	context.lineTo(146.1741,108.2813);
	context.lineTo(146.6852,109.0035);
	context.lineTo(107.7348,111.1351);
	context.lineTo(108.7922,112.4563);
	context.lineTo(101.9891,113.3547);
	context.lineTo(103.2229,113.9712);
	context.lineTo(99.2045,115.0282);
	context.lineTo(99.2573,115.4862);
	context.lineTo(102.9585,115.6624);
	context.lineTo(102.9585,115.7681);
	context.lineTo(96.1906,116.0675);
	context.lineTo(98.3585,116.8426);
	context.lineTo(91.15,117.4768);
	context.lineTo(94.0581,119.9078);
	context.lineTo(126.8928,119.9254);
	context.lineTo(126.8928,119.6964);
	context.lineTo(122.9801,119.0446);
	context.lineTo(134.7886,119.626);
	context.lineTo(132.7089,121);
	context.lineTo(148.853,120.9824);
	context.lineTo(147.5488,120.2601);
	context.lineTo(187.592,118.5514);
	context.lineTo(187.592,118.1991);
	context.lineTo(184.4019,117.741);
	context.lineTo(184.4195,117.6001);
	context.lineTo(187.5038,117.6001);
	context.lineTo(187.5038,117.3711);
	context.lineTo(184.3843,117.1597);
	context.closePath();
	context.moveTo(143.4423,69.3676);
	context.lineTo(143.1603,66.3729);
	context.lineTo(143.3894,66.3376);
	context.lineTo(143.7419,69.3324);
	context.lineTo(143.4423,69.3676);
	context.closePath();
	context.moveTo(141.5388,61.0176);
	context.lineTo(142.6315,59.3265);
	context.lineTo(143.1074,59.8726);
	context.lineTo(141.5388,61.0176);
	context.closePath();
	context.moveTo(133.6959,36.5314);
	context.lineTo(133.2552,37.7293);
	context.lineTo(135.2997,38.293);
	context.lineTo(134.771,39.4204);
	context.lineTo(123.5264,35.6858);
	context.lineTo(123.1916,35.2807);
	context.lineTo(126.0996,35.5802);
	context.lineTo(126.4521,33.5895);
	context.lineTo(115.0314,34.259);
	context.lineTo(107.3294,43.842);
	context.lineTo(107.3647,44.6524);
	context.lineTo(110.8015,49.1621);
	context.lineTo(109.3739,48.2813);
	context.lineTo(109.4091,52.65);
	context.lineTo(113.1632,56.2085);
	context.lineTo(122.5571,54.9753);
	context.lineTo(122.8215,56.4022);
	context.lineTo(126.3288,56.4022);
	context.lineTo(125.8529,59.5026);
	context.lineTo(131.9863,82.5972);
	context.lineTo(133.361,83.8127);
	context.lineTo(138.102,83.0904);
	context.lineTo(141.8913,78.8802);
	context.lineTo(142.561,75.5332);
	context.lineTo(143.5128,76.8544);
	context.lineTo(143.1955,73.1198);
	context.lineTo(146.8262,70.9706);
	context.lineTo(148.0952,58.8332);
	context.lineTo(152.9596,56.2261);
	context.lineTo(155.145,51.0998);
	context.lineTo(150.8799,52.0687);
	context.lineTo(147.7427,49.2149);
	context.lineTo(147.7427,50.1662);
	context.lineTo(142.0076,38.1641);
	context.lineTo(133.6959,36.5314);
	context.closePath();
	context.moveTo(143.6185,15.0575);
	context.lineTo(144.4645,15.7446);
	context.lineTo(144.6584,16.4492);
	context.lineTo(143.8476,16.185);
	context.lineTo(143.6185,15.0575);
	context.closePath();
	context.moveTo(215.7209,23.9536);
	context.lineTo(212.4603,26.6136);
	context.lineTo(211.5791,25.9794);
	context.lineTo(215.7209,23.9536);
	context.closePath();
	context.moveTo(159.7627,32.2507);
	context.lineTo(157.8592,31.5813);
	context.lineTo(160.45,29.5026);
	context.lineTo(160.3091,27.5473);
	context.lineTo(162.9527,26.4903);
	context.lineTo(162.6884,28.6218);
	context.lineTo(163.0056,28.7804);
	context.lineTo(159.6393,30.8591);
	context.lineTo(159.7627,32.2507);
	context.closePath();
	context.moveTo(155.5151,23.3194);
	context.lineTo(158.8286,26.4727);
	context.lineTo(159.4631,26.4903);
	context.lineTo(158.106,27.1773);
	context.lineTo(158.2822,27.653);
	context.lineTo(155.0217,28.1814);
	context.lineTo(157.8945,33.1668);
	context.lineTo(153.9113,33.1139);
	context.lineTo(152.4132,30.7181);
	context.lineTo(152.9478,30.8767);
	context.lineTo(154.1404,30.9648);
	context.lineTo(151.9726,22.8614);
	context.lineTo(152.378,23.7775);
	context.lineTo(156.1673,23.0904);
	context.lineTo(155.5151,23.3194);
	context.closePath();
	context.moveTo(147.2862,26.2963);
	context.lineTo(145.7511,27.9524);
	context.lineTo(148.7649,29.6964);
	context.lineTo(138.8599,29.9254);
	context.lineTo(139.4415,27.6177);
	context.lineTo(138.2783,28.2402);
	context.lineTo(137.5204,28.2519);
	context.lineTo(147.2862,26.2963);
	context.closePath();
	context.moveTo(147.3285,26.2875);
	context.lineTo(147.6017,26.0147);
	context.lineTo(149.4875,25.5919);
	context.lineTo(148.2186,26.3318);
	context.lineTo(150.1573,27.0012);
	context.lineTo(150.1044,27.195);
	context.lineTo(147.3285,26.2875);
	context.closePath();
	context.moveTo(147.3021,26.2789);
	context.lineTo(147.3285,26.2875);
	context.lineTo(147.3197,26.2965);
	context.lineTo(147.2862,26.2963);
	context.lineTo(147.3021,26.2789);
	context.closePath();
	context.moveTo(206.1128,12.2105);
	context.lineTo(208.6005,14.2824);
	context.lineTo(206.1128,12.2105);
	context.closePath();
	context.moveTo(205.9736,12.0943);
	context.lineTo(205.9568,12.0804);
	context.lineTo(207.0848,10.1427);
	context.lineTo(207.9484,9.9665);
	context.lineTo(205.9736,12.0943);
	context.closePath();
	context.moveTo(205.9568,12.1157);
	context.lineTo(205.9736,12.0943);
	context.lineTo(206.1128,12.2105);
	context.lineTo(205.9568,12.1157);
	context.closePath();
	context.moveTo(143.0721,39.9665);
	context.lineTo(143.5304,39.3852);
	context.lineTo(150.545,50.448);
	context.lineTo(161.014,43.8244);
	context.lineTo(158.811,41.1468);
	context.lineTo(155.4975,43.1374);
	context.lineTo(150.1749,36.8485);
	context.lineTo(150.2454,35.2983);
	context.lineTo(157.7359,40.6007);
	context.lineTo(160.6615,41.323);
	context.lineTo(166.742,39.35);
	context.lineTo(168.4164,42.1861);
	context.lineTo(169.5091,41.8162);
	context.lineTo(173.6156,53.6189);
	context.lineTo(180.9475,41.8338);
	context.lineTo(178.0747,41.6224);
	context.lineTo(177.9337,41.1292);
	context.lineTo(184.6839,40.8297);
	context.lineTo(182.5866,41.6577);
	context.lineTo(184.7192,41.9219);
	context.lineTo(183.6969,42.6442);
	context.lineTo(186.0234,47.33);
	context.lineTo(186.2525,46.0969);
	context.lineTo(187.9621,47.2948);
	context.lineTo(188.3851,53.4075);
	context.lineTo(189.1958,54.0065);
	context.lineTo(189.0724,53.2666);
	context.lineTo(189.6364,47.1538);
	context.lineTo(192.5621,51.9454);
	context.lineTo(192.7736,51.047);
	context.lineTo(191.3636,50.0429);
	context.lineTo(192.2449,49.6025);
	context.lineTo(194.9767,52.0687);
	context.lineTo(193.5139,44.3529);
	context.lineTo(198.0434,43.9301);
	context.lineTo(198.8717,42.8027);
	context.lineTo(201.9384,42.6089);
	context.lineTo(204.7055,39.2795);
	context.lineTo(201.1806,38.3282);
	context.lineTo(201.7446,39.438);
	context.lineTo(200.6871,38.1873);
	context.lineTo(198.5192,39.7023);
	context.lineTo(198.5897,37.6765);
	context.lineTo(199.7706,36.5314);
	context.lineTo(200.8457,31.5109);
	context.lineTo(206.1507,29.6436);
	context.lineTo(205.0227,31.458);
	context.lineTo(208.4067,35.1398);
	context.lineTo(209.3936,34.8403);
	context.lineTo(208.8473,31.4756);
	context.lineTo(212.1431,28.8861);
	context.lineTo(214.2757,28.798);
	context.lineTo(218.5232,23.0376);
	context.lineTo(214.7339,20.7651);
	context.lineTo(225.8903,17.5414);
	context.lineTo(225.8903,18.0875);
	context.lineTo(229.662,16.1674);
	context.lineTo(234.826,15.1456);
	context.lineTo(234.7379,16.2026);
	context.lineTo(230.6842,18.6512);
	context.lineTo(229.6443,23.6541);
	context.lineTo(232.2175,21.1527);
	context.lineTo(234.9317,17.1362);
	context.lineTo(245.8061,15.5156);
	context.lineTo(242.105,13.7011);
	context.lineTo(241.2825,13.1609);
	context.lineTo(240.8712,12.8908);
	context.lineTo(242.8628,13.0317);
	context.lineTo(246,13.2959);
	context.lineTo(246,10.8297);
	context.lineTo(239.5494,9.9841);
	context.lineTo(240.2896,11.4287);
	context.lineTo(233.0107,10.5126);
	context.lineTo(233.5394,11.9043);
	context.lineTo(225.4144,13.754);
	context.lineTo(224.2336,10.9883);
	context.lineTo(226.1371,10.2308);
	context.lineTo(226.0313,9.8961);
	context.lineTo(219.6512,11.4815);
	context.lineTo(222.4359,10.8297);
	context.lineTo(222.4359,10.4245);
	context.lineTo(197.2327,8.2578);
	context.lineTo(198.0258,8.9977);
	context.lineTo(190.2357,9.1738);
	context.lineTo(191.0993,8.3282);
	context.lineTo(189.4778,9.121);
	context.lineTo(180.8065,10.2836);
	context.lineTo(182.2517,9.35);
	context.lineTo(180.4364,7.6588);
	context.lineTo(180.0839,7.9759);
	context.lineTo(180.0759,7.7458);
	context.lineTo(175.8716,7.5531);
	context.lineTo(176.4003,8.3282);
	context.lineTo(180.0134,8.7158);
	context.lineTo(179.185,9.1033);
	context.lineTo(181.1061,15.1985);
	context.lineTo(179.3965,10.9706);
	context.lineTo(177.9865,14.8109);
	context.lineTo(172.47,14.4938);
	context.lineTo(172.8049,12.8732);
	context.lineTo(172.0823,13.754);
	context.lineTo(166.0194,14.1239);
	context.lineTo(167.6585,14.6524);
	context.lineTo(165.1029,14.8638);
	context.lineTo(167.6233,16.3964);
	context.lineTo(166.9359,15.6213);
	context.lineTo(171.1129,15.7798);
	context.lineTo(173.0693,15.7798);
	context.lineTo(172.611,16.3083);
	context.lineTo(175.8716,16.2202);
	context.lineTo(174.4616,16.643);
	context.lineTo(177.6164,18.3693);
	context.lineTo(177.5107,18.5807);
	context.lineTo(171.6769,16.5197);
	context.lineTo(168.6984,18.7041);
	context.lineTo(165.6493,19.4439);
	context.lineTo(164.0455,16.9425);
	context.lineTo(166.7597,17.1362);
	context.lineTo(163.7635,15.2161);
	context.lineTo(163.7987,14.9695);
	context.lineTo(162.3183,15.956);
	context.lineTo(162.0363,13.9654);
	context.lineTo(167.5175,11.7986);
	context.lineTo(162.1244,10.2484);
	context.lineTo(162.5298,11.2525);
	context.lineTo(156.9427,12.0981);
	context.lineTo(155.8853,13.4545);
	context.lineTo(155.7443,12.5032);
	context.lineTo(154.0699,12.0981);
	context.lineTo(155.8148,11.3934);
	context.lineTo(149.5756,13.0141);
	context.lineTo(147.1434,13.4545);
	context.lineTo(150.1925,15.5684);
	context.lineTo(147.2668,14.4762);
	context.lineTo(147.8308,14.2824);
	context.lineTo(144.0944,14.3353);
	context.lineTo(143.125,12.9436);
	context.lineTo(142.1909,12.3095);
	context.lineTo(147.6722,12.6265);
	context.lineTo(147.6546,11.7281);
	context.lineTo(140.1641,10.1955);
	context.lineTo(140.8691,9.8256);
	context.lineTo(136.7097,10.0546);
	context.lineTo(137.2913,9.3324);
	context.lineTo(123.174,15.5684);
	context.lineTo(123.7027,18.4398);
	context.lineTo(127.1924,18.1756);
	context.lineTo(130.1004,17.6647);
	context.lineTo(134.6652,13.0669);
	context.lineTo(137.3618,13.6306);
	context.lineTo(134.5418,15.2513);
	context.lineTo(134.3832,15.6036);
	context.lineTo(136.7449,16.9425);
	context.lineTo(140.3756,16.1321);
	context.lineTo(142.8607,17.4357);
	context.lineTo(141.9089,17.8233);
	context.lineTo(141.1863,18.8274);
	context.lineTo(137.5204,18.3165);
	context.lineTo(138.0139,17.4709);
	context.lineTo(136.41,17.7176);
	context.lineTo(136.8507,18.0875);
	context.lineTo(136.41,20.2366);
	context.lineTo(134.6476,19.3382);
	context.lineTo(134.2951,19.9548);
	context.lineTo(135.2116,20.7827);
	context.lineTo(129.7761,22.094);
	context.lineTo(126.0291,21.7692);
	context.lineTo(126.2406,22.4386);
	context.lineTo(115.8069,25.5214);
	context.lineTo(118.8559,27.2478);
	context.lineTo(117.4107,28.8685);
	context.lineTo(112.511,28.8685);
	context.lineTo(112.4229,32.0922);
	context.lineTo(114.9432,33.9419);
	context.lineTo(119.1203,32.1627);
	context.lineTo(119.2084,31.2466);
	context.lineTo(125.1655,28.3048);
	context.lineTo(130.0123,31.2819);
	context.lineTo(129.4836,33.5191);
	context.lineTo(131.951,30.9119);
	context.lineTo(125.7472,27.6177);
	context.lineTo(135.2292,33.4662);
	context.lineTo(134.8943,30.9648);
	context.lineTo(140.0055,33.9419);
	context.lineTo(144.4469,33.2196);
	context.lineTo(144.676,33.4134);
	context.lineTo(143.0721,39.9665);
	context.closePath();
	context.stroke();
	context.restore();
	context.restore();
};