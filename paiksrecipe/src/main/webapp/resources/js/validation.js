var joinValidate = {
	// 결과 메시지 출력시 사용하는 text

	// JSON
	resultCode : {
		// 공통
		empty_val : {
			code : 1,
			desc : '필수 정보입니다.'
		},
		space_length_val : {
			code : 2,
			desc : '공백없이 입력해주세요.'
		},
		// ID
		success_id : {
			code : 0,
			desc : '멋진 아이디네요:)'
		},
		specialStr_id : {
			code : 3,
			desc : '특수문자는 (-), (_), (@), (.)만 이용 가능합니다.'
		},
		invalid_id : {
			code : 4,
			desc : '아이디는 영문 소문자, 숫자, 특수기호 일부만 사용할 수 있습니다.'
		},
		first_special_id : {
			code : 5,
			desc : '첫 글자는 특수문자를 이용하실 수 없습니다.'
		},
		length_id : {
			code : 6,
			desc : '아이디는 5자이상~20자이하여야 합니다.'
		},
		overlap_id : {
			code : 7,
			desc : '이미 사용중인 ID입니다.'
		},
		// pw
		success_pw : {
			code : 0,
			desc : '사용가능한 비밀번호입니다.'
		},
		equal_success_pw : {
			code : 10,
			desc : '사용가능한 비밀번호입니다.'
		},
		success_nowpw : {
			code: 100,
			desc : '확인되었습니다.'
		},
		invalid_pw : {
			code : 3,
			desc : '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.'
		},
		stream_pw : {
			code : 4,
			desc : '같은 문자를 4번 이상 사용하실 수 없습니다.'
		},
		hangle_pw : {
			code : 5,
			desc : '비밀번호에 한글은 사용하실 수 없습니다.'
		},
		other_pw : {
			code : 6,
			desc : '입력하신 비밀번호가 일치하지 않습니다.'
		},
		equal_pw : {
			code : 7,
			desc : '현재 비밀번호와 다르게 입력해주세요.'
		},
		// name
		success_name : {
			code : 0,
			desc : '멋진 이름이네요:)'
		},
		invalid_name : {
			code : 3,
			desc : '이름은 표준한글만 입력가능합니다.'
		},
		length_name : {
			code : 4,
			desc : '이름은 2자이상 ~ 20자이하만 가능합니다.'
		},
		// phone
		success_phone : {
			code : 0,
			desc : '사용가능한 번호입니다.'
		},
		invalid_phone : {
			code : 3,
			desc : '휴대폰 번호가 유효하지 않습니다.'
		},
		length_phone : {
			code : 4,
			desc : '(-)없이 10, 11자로 입력해주세요.'
		},
		number_phone : {
			code : 5,
			desc : '숫자만 입력해주세요.'
		},
		// email
		success_email : {
			code : 0,
			desc : '사용가능한 이메일입니다.'
		},
		invalid_email : {
			code : 3,
			desc : '올바른 이메일을 입력해주세요.'
		},
		// address
		success_addr : {
			code : 0,
			desc : '좋은 곳에 사시네요!'
		},
		empty_post : {
			code : 3,
			desc : '[우편번호 찾기]를 클릭하고 값을 입력해주세요.'
		},
		empty_detail : {
			code : 4,
			desc : '상세주소를 입력해주세요.'
		},
		invalid_addr : {
			code : 5,
			desc : '올바른 주소를 입력해주세요.'
		}
	},

	// 아이디 유효성 체크
	checkId : function(id) {
		// 정규식
		var regEmpty = /\s/g; // 공백문자
		var regEtc = /[~`!#$%^&*()+=\|\\\{\}\[\]:";'<>,?//]/g; // 특수문자
		var regid = /[^a-z0-9-_.@]+/g; // 올바른 아이디 형식}

		if (id == '' || id.length == 0) { // 1. 값이 있는지 없는지 체크(spacebar이 들어올 경우를 대비해 length(spacebar는 length=0)도 비교)
			return this.resultCode.empty_val;
		} else if (id.match(regEmpty)) { // 2. 값 사이에 공백이 있는지 체크
			return this.resultCode.space_length_val;
		} else if (id.match(regEtc)) { // 3. 특수문자 체크(-, _, @, .만 가능)
			return this.resultCode.specialStr_id;
		} else if (id.match(regid)) { // 4. 아이디 정규식 체크
			return this.resultCode.invalid_id;
		} else if (id.charAt(0) == '-' || id.charAt(0) == '_' || id.charAt(0) == '@' || id.charAt(0) == '.') { // 5. 첫글자로 특수문자 사용불가							
			return this.resultCode.first_special_id;
		} else if (id.length < 5 || id.length > 20) { // 6. 길이(5~20자 이내)
			return this.resultCode.length_id;
		} else if(idCheck(id)){ // 7. 아이디 중복 체크
			return this.resultCode.overlap_id;
		} else {
			return this.resultCode.success_id;
		}
	},

	// 패스워드 유효성 체크
	checkPw : function(nowpw, pw, rpw) {
		var regEmpty = /\s/g; // 공백문자
		var regPw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/; 
		var regHangle = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

		if (pw == '' || pw.length == 0) { // 1. 값이 있는지 체크
			return this.resultCode.empty_val;
		} else if (pw.match(regEmpty)) { // 2. 공백값이 있는지 체크
			return this.resultCode.space_length_val;
		} else if (/(\w)\1\1\1/.test(pw)) { // 3. 같은 값이 4번 연속으로 사용됐는지 체크
			return this.resultCode.stream_pw;
		} else if (regHangle.test(pw)) { // 4. 한글 사용 체크
			return this.resultCode.hangle_pw;
		} else if (!pw.match(regPw)) { // 5. 유효성 체크
			// ^가 있으면 !를 쓴다.
			return this.resultCode.invalid_pw;
		} else if (pw == nowpw) {
			return this.resultCode.equal_pw;
		} else if (rpw != '' || rpw.length != 0) { // 6. 비밀번호 재확인 값이 있으면
			if (pw == rpw) {
				return this.resultCode.equal_success_pw;
			} else {
				return this.resultCode.other_pw;
			}
		} else {
			return this.resultCode.success_pw;
		}
	},

	// 비밀번호 유효성 체크를 통과한 값과
	// 비밀번호 재확인 값이 같다면
	// 비밀번호 재확인 값은 유효성체크를 할 필요가 없음
	checkRpw : function(pw, rpw, pwFlag) {
		if (rpw == '' || rpw.length == 0) { // 1. 값이 있는지 체크
			return this.resultCode.empty_val;
		} else if (!pwFlag) { // 2. 유효성 체크
			return this.resultCode.invalid_pw;
		} else { // 3. pw == rpw 비교
			if (pw == rpw && pwFlag) {
				return this.resultCode.equal_success_pw;
			} else {
				return this.resultCode.other_pw;
			}
		}
	},

	checkName : function(name) {
		var regEmpty = /\s/g; // 공백문자
		var regName = /^[a-zA-Z0-9가-힣-\s]+$/;

		if (name == '' || name.length == 0) { // 1. 값 유무
			return this.resultCode.empty_val;
		} else if (name.match(regEmpty)) { // 2. 공백 유무
			return this.resultCode.space_length_val;
		} else if (!name.match(regName)) { // 3. 유효성 체크
			return this.resultCode.invalid_name;
		} else if (name.length < 2 || name.length > 20) { // 3. 글자수 체크(2~20자)
			return this.resultCode.length_name;
		} else { // 통과
			return this.resultCode.success_name;
		}
	},

	checkEmail : function(email) {
		var regEmpty = /\s/g; // 공백문자
		var regEmail = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g;

		if (email == '' || email.length == 0) { // 1. 값 유무
			return this.resultCode.empty_val;
		} else if (email.match(regEmpty)) { // 2. 공백 유무
			return this.resultCode.space_length_val;
		} else if (!email.match(regEmail)) { // 3. 유효성 체크
			return this.resultCode.invalid_email;
		} else { // 통과
			return this.resultCode.success_email;
		}
	},

	checkPhone : function(phone) {
		var regEmpty = /\s/g; // 공백문자
		var regPhone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/g;

		if (phone == '' || phone.length == 0) { // 1. 값 유무
			return this.resultCode.empty_val;
		} else if (phone.match(regEmpty)) { // 2. 공백 유무
			return this.resultCode.space_length_val;
		} else if (!phone.match(regPhone)) { // 3. 유효성 체크
			return this.resultCode.invalid_phone;
		} else { // 통과
			return this.resultCode.success_phone;
		}
	},

	checkAddr : function(addrDetail, addrPost) {
		// 영어대문자, 영어소문자, 한글, -, 공백외에 전부 체크
		var regAddr = /^[a-zA-Z0-9가-힣-\s]+$/;
		
		if (addrPost == '' || addrPost.length == 0) { // 1. 공백 유무
			return this.resultCode.empty_post;
		} else if (addrDetail == '' || addrDetail.length == 0) { // 2. 값 유무
			return this.resultCode.empty_detail;
		} else if (!addrDetail.match(regAddr)) { // 3. 유효성 체크
			return this.resultCode.invalid_addr;
		} else { // 통과
			return this.resultCode.success_addr;
		}
	},
	
	checkNowpw : function(pw) {
		var regEmpty = /\s/g; // 공백문자
		
		if (pw == '' || pw.length == 0) { // 1. 값이 있는지 체크
			return this.resultCode.empty_val;
		} else if (pw.match(regEmpty)) { // 2. 공백값이 있는지 체크
			return this.resultCode.space_length_val;
		} else if (pwCheck(pw)) { // 3. 현재 비밀번호와 동일한지 체크
			return this.resultCode.other_pw;
		} else { // 4. 유효성 체크 통과
			return this.resultCode.success_nowpw;
		}
	}
}

function idCheck(id) {
	var return_val = true;
	$.ajax({
		type: 'POST',
		url: 'idoverlap?id=' + id,
		async: false, // retrun 사용하기 위해서, ajax(비동기방식)는 차례대로 실행x 다 먼저 실행하므로 return 사용불가능
		success: function(data) {
			if (data >= 1) {
				return_val = true;
			} else {
				return_val = false;
			}
		},
		error: function() {
			alert('System ERROR:(');
		}
	});
	return return_val;
}

function pwCheck(pw) {
	var return_val = true;
	$.ajax({
		type: 'POST', 
		url: 'pwcheck?pw='+pw, 
		async: false, 
		success: function(data){
			console.log(data);
			if(data == 1) {
				return_val = false;
			} else if(data == 0) {
				return_val = true;
			}
		},
		error: function(){
			alert('System ERROR:(');
		}
	});
	return return_val;
}