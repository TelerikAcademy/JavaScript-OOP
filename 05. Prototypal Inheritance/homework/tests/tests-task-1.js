/* globals describe, it */
var expect = require('chai').expect;
describe('Tests for "Task 1"', function() {
	var domElement = require('../tasks/task-1')();

	describe('Test for exist correct type ', function() {
		it('expect domElement to be an object', function() {
			expect(domElement).to.be.a('object');
		});
		it('expect domElement.init to be a function', function() {
			expect(domElement.init).to.be.a('function');
		});
		it('expect domElement.appendChild to be a function', function() {
			expect(domElement.appendChild).to.be.a('function');
		});
		it('expect domElement.addAttribute to be a function', function() {
			expect(domElement.appendChild).to.be.a('function');
		});

		it('expect domElement.init to return this', function() {
			var root = Object.create(domElement);
			expect(root.init('whatever')).to.equal(root);
		});
		it('expect domElement.appendChild to return this', function() {
			var root = Object.create(domElement);
			root.init('whatever');
			expect(root.appendChild('text')).to.equal(root);
		});
		it('expect domElement.addAttribute to return this', function() {
			var root = Object.create(domElement);
			root.init('whatever');
			expect(root.addAttribute('class', 'working?')).to.equal(root);
		});
	});

	describe('Sanity checks', function() {
		it('expect domElement with empty type to throw', function() {
			function test() {
				Object.create(domElement).init('');
			}
			expect(test).to.throw();
		});
		it('expect domElement with type not a string to throw', function() {
			function test() {
				Object.create(domElement).init(42);
			}
			expect(test).to.throw();
		});
		it('expect domElement with type containing bad characters to throw', function() {
			function test() {
				Object.create(domElement).init('hello!');
			}
			expect(test).to.throw();
		});
		it('expect domElement with valid type not to throw', function() {
			function test() {
				Object.create(domElement).init('grO0zen1TagnaMe');
			}
			expect(test).to.not.throw();
		});

		it('expect adding attribute with empty name to throw', function() {
			function test() {
				var root = Object.create(domElement)
					.init('whatever')
					.addAttribute('', 'spam');
			}
			expect(test).to.throw();
		});
		it('expect adding attribute with name containing bad characters to throw', function() {
			function test() {
				var root = Object.create(domElement)
					.init('whatever')
					.addAttribute('Hello 007', 'spam');
			}
			expect(test).to.throw();
		});
		it('expect adding attribute with valid name not to throw', function() {
			function test() {
				var root = Object.create(domElement)
					.init('whatever')
					.addAttribute('data-spam', 'mnogo spam');
			}
			expect(test).to.not.throw();
		});
	});

	describe('Adding attributes', function() {
		it('expect empty domElement to generate correct HTML', function() {
			var type = 'html',
				root = Object.create(domElement)
					.init(type);
			expect(root.innerHTML).to.eql('<' + type + '></' + type + '>');
		});

		it('expect domElement with a single attribute to generate correct HTML', function() {
			var root = Object.create(domElement)
				.init('div')
				.addAttribute('data-id', 'cuki');

			expect(root.innerHTML).to.eql('<div data-id="cuki"></div>');
		});
		it('expect attribute value to be in double quotes when it is a number', function() {
			var root = Object.create(domElement)
				.init('whateverTag')
				.addAttribute('something', 42);
			expect(root.innerHTML).to.eql('<whateverTag something="42"></whateverTag>');
		});
		it('expect domElement with attributes to generate HTML with the attributes in correct order', function() {
			var root = Object.create(domElement)
				.init('NqmaTakufTag')
				.addAttribute('xyz', 'some value')
				.addAttribute('zzz', '')
				.addAttribute('abc', 'other value');
			expect(root.innerHTML).to.eql('<NqmaTakufTag abc="other value" xyz="some value" zzz=""></NqmaTakufTag>');
		});
		it('expect repeating attribute name to hold only the last value', function() {
			var root = Object.create(domElement)
				.init('theGuiltyTag')
				.addAttribute('adata', 'do not')
				.addAttribute('bdata', 'see')
				.addAttribute('adata', 'me');
			
			expect(root.innerHTML).to.eql('<theGuiltyTag adata="me" bdata="see"></theGuiltyTag>');
		});

	});

	describe('Adding children', function() {
		it('expect correct HTML when child is a string', function() {
			var text = 'Some text here, doesn\'t really matter that much what it is.',
				root = Object.create(domElement)
					.init('p')
					.appendChild(text);
			expect(root.innerHTML).to.eql('<p>' + text + '</p>');
		});

		it('expect correct HTML with nested domElements (one parent, one child)', function() {
			var child = Object.create(domElement)
					.init('child'),
				parent = Object.create(domElement)
					.init('parent')
					.appendChild(child);
			expect(parent.innerHTML).to.eql('<parent><child></child></parent>');
		});
		it('expect correct HTML with nested domElements (one parent, two children)', function() {
			var child1 = Object.create(domElement).init('childy'),
				child2 = Object.create(domElement).init('childx'),
				parent = Object.create(domElement)
					.init('parent')
					.appendChild(child1)
					.appendChild(child2);
			expect(parent.innerHTML).to.eql('<parent><childy></childy><childx></childx></parent>');
		});
		it('expect correct HTML with nested domElements (grandparent, parent and child)', function() {
			var child = Object.create(domElement).init('child'),
				middle = Object.create(domElement)
					.init('middleBlq')
					.appendChild(child);
				parent = Object.create(domElement)
					.init('parent')
					.appendChild(middle);
			expect(parent.innerHTML).to.eql('<parent><middleBlq><child></child></middleBlq></parent>');
		});

		it('expect correct HTML when adding content', function() {
			var text = 'Some text here, doesn\'t really matter that much what it is.',
				root = Object.create(domElement).init('p');
			root.content = text;
			expect(root.innerHTML).to.eql('<p>' + text + '</p>');
		});
		it('expect string children to override parent\'s content', function() {
			var text = 'see me',
				parent = Object.create(domElement)
					.init('parent')
					.appendChild(text);
			parent.content = 'some random content';
			expect(parent.innerHTML).to.eql('<parent>see me</parent>');
		});
		it('expect domElement children to override parent\'s content', function() {
			var child = Object.create(domElement)
					.init('child'),
				parent = Object.create(domElement)
					.init('parent')
					.appendChild(child);
			parent.content = 'some random content';
			child.content = 'see me';
			expect(parent.innerHTML).to.eql('<parent><child>see me</child></parent>');
		});

		it('expect correct HTML when having both string and domElement children', function() {
			var text = 'the text you SEE!',
				root = Object.create(domElement).init('p'),
				child1 = Object.create(domElement).init('b'),
				child2 = Object.create(domElement).init('s');
			root.appendChild(text);
			root.appendChild(child1);
			root.appendChild(text);
			root.appendChild(child2);
			root.appendChild(text);
			expect(root.innerHTML).to.eql('<p>' + text + '<b></b>' + text + '<s></s>' + text + '</p>');
		});

		it('expect correct HTML, when there are attributes with same names, but in different domElements', function() {
			var child = Object.create(domElement)
					.init('child')
					.addAttribute('id', 'cid'),
				parent = Object.create(domElement)
					.init('parent')
					.addAttribute('id', 'pid')
					.appendChild(child);
				expect(parent.innerHTML).to.eql('<parent id="pid"><child id="cid"></child></parent>');
		});
	});

	describe('Mixing it all together', function() {
		it('expect the example test given in the description to work', function() {
			var meta = Object.create(domElement)
				.init('meta')
				.addAttribute('charset', 'utf-8');

			var head = Object.create(domElement)
				.init('head')
				.appendChild(meta);

			var div = Object.create(domElement)
				.init('div')
				.addAttribute('style', 'font-size: 42px');

			div.content = 'Hello, world!';

			var body = Object.create(domElement)
				.init('body')
				.appendChild(div)
				.addAttribute('id', 'cuki')
				.addAttribute('bgcolor', '#012345');

			var root = Object.create(domElement)
				.init('html')
				.appendChild(head)
				.appendChild(body);

			expect(root.innerHTML).to.eql('<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>');
		});

		it('expect this big test to work', function() {
			var style = Object.create(domElement)
					.init('style')
					.appendChild('#big {\nfont-size: 144pt;\n}'),
				link = Object.create(domElement)
					.init('link')
					.addAttribute('src', 'css/fancy.css'),
				meta = Object.create(domElement)
					.init('meta')
					.addAttribute('charset', 'utf-8'),
				title = Object.create(domElement)
					.init('title')
					.appendChild('Super-Mega awesome S173'),
				script = Object.create(domElement)
					.init('script')
					.addAttribute('lang', 'javascript')
					.appendChild('function init(){}'),
				head = Object.create(domElement)
					.init('head')
					.appendChild(meta)
					.appendChild(title)
					.appendChild(link)
					.appendChild(style)
					.appendChild(script),
				heading = Object.create(domElement)
					.init('h1'),
				luser = Object.create(domElement)
					.init('label')
					.addAttribute('for', 'username')
					.addAttribute('class', 'big'),
				lpass = Object.create(domElement)
					.init('label')
					.addAttribute('for', 'password'),
				user = Object.create(domElement)
					.init('input')
					.addAttribute('name', 'username')
					.addAttribute('id', 'username')
					.addAttribute('type', 'input')
					.addAttribute('tab-index', 1),
				pass = Object.create(domElement)
					.init('input')
					.addAttribute('name', 'password')
					.addAttribute('id', 'password')
					.addAttribute('type', 'password')
					.addAttribute('tab-index', 2),
				submit = Object.create(domElement)
					.init('input')
					.addAttribute('type', 'submit')
					.addAttribute('value', 'natis'),
				form = Object.create(domElement)
					.init('form')
					.appendChild(luser)
					.appendChild(user)
					.addAttribute('action', 'vlez/mi/u/profila')
					.appendChild(lpass)
					.addAttribute('method', 'post')
					.appendChild(pass)
					.appendChild(submit),
				footer = Object.create(domElement)
					.init('footer'),
				body = Object.create(domElement)
					.init('body')
					.appendChild(heading)
					.appendChild(form)
					.appendChild('reklamata')
					.appendChild(footer),
				html = Object.create(domElement)
					.init('html')
					.appendChild(head)
					.appendChild(body);

			heading.content = 'tova izliza v golemi bukvi';
			head.content = 'tova ne trqbva da izliza';
			luser.content = 'Username: ';
			lpass.content = 'Password: ';
			footer.content = 'stiga tolkoz';

			expect(html.innerHTML).to.eql('<html><head><meta charset="utf-8"></meta><title>Super-Mega awesome S173</title><link src="css/fancy.css"></link><style>#big {\nfont-size: 144pt;\n}</style><script lang="javascript">function init(){}</script></head><body><h1>tova izliza v golemi bukvi</h1><form action="vlez/mi/u/profila" method="post"><label class="big" for="username">Username: </label><input id="username" name="username" tab-index="1" type="input"></input><label for="password">Password: </label><input id="password" name="password" tab-index="2" type="password"></input><input type="submit" value="natis"></input></form>reklamata<footer>stiga tolkoz</footer></body></html>');
		});
	});
});
