/*!
 * i18n.js — 中英自动适配
 * 给带 data-i18n="key" 的元素注入对应语言的 HTML。
 * 首次访问根据浏览器语言自动选择（zh -> 中文，其它 -> 英文），
 * 用户手动切换后写入 localStorage，下次优先读取已保存的选择。
 */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'i18n_lang';

  /* ------------------------------------------------------------------ */
  /* 翻译字典                                                           */
  /* ------------------------------------------------------------------ */
  var I18N = {

    /* ----- 导航 ----- */
    'nav.thanks':     { en: 'Thanks',      zh: '感谢' },
    'nav.education':  { en: 'Education',   zh: '教育' },
    'nav.research':   { en: 'Research',    zh: '研究' },

    /* ----- 顶部横幅 ----- */
    'banner.subtitle': { en: 'Student, Researcher, Optimist', zh: '学生 · 研究者 · 乐观主义者' },

    /* ----- Welcome ----- */
    'welcome.h4': { en: 'Welcome', zh: '欢迎' },
    'welcome.p1': {
      en: 'Hi~ I am Yizhen Yuan. I am currently a Ph.D. candidate at <a href="https://www.tsinghua.edu.cn/en/" target="_blank">Tsinghua University in Beijing, China</a>, and fortunately advised by <a href="https://yunxinliu.github.io/">Professor Liu, Yunxin</a> and <a href="https://yuanchun-li.github.io/">Professor Li, Yuanchun</a>. I completed my undergraduate studies at <a href="https://www.purdue.edu/" target="_blank">Purdue University in West Lafayette, U.S</a>.',
      zh: '大家好，我是袁宜桢（Yizhen Yuan）。我目前是<a href="https://www.tsinghua.edu.cn/en/" target="_blank">清华大学</a>的博士研究生，由<a href="https://yunxinliu.github.io/">刘云新教授</a>和<a href="https://yuanchun-li.github.io/">李元春老师</a>共同指导。我本科毕业于<a href="https://www.purdue.edu/" target="_blank">普渡大学</a>。'
    },
    'welcome.p2': {
      en: 'I am interested in LLM/Agent Security, Privacy and Reliability. This is also the section I am responsible for in the paper Personal LLM Agents.',
      zh: '我对大型语言模型、Agent的安全、隐私与可靠性感兴趣。这也是我在《Personal LLM Agents》论文中所负责的章节。'
    },

    /* ----- Thanks 横幅 ----- */
    'thanks.banner': {
      en: 'I am deeply grateful for their help. Without their help, I wouldn\'t be able to become the person I am today.',
      zh: '我深深感激他们的帮助。没有他们的帮助，就不会有今天的我。'
    },

    /* ----- Thanks 区 ----- */
    'thanks.h4': { en: 'Thanks', zh: '感谢' },
    'thanks.p1': {
      en: 'When I come in to Purdue, <a href="https://turkeyland.net/" style="color: black" target="_blank">Professor Turkstra</a> have set up a good value as a computer scientist for me. When I took CS 397 (Honor Seminar), <a href="https://beerkay.github.io/" style="color: black" target="_blank">Professor Berkay</a> chose me to do project with him amoung a lot of Computer Science Honor students. When I took CS 381 (Undergrad Crypto) and CS 580 (Grad Algorithm), <a href="https://www.cs.purdue.edu/homes/jblocki/" style="color: black" target="_blank">Professor Blocki</a> helped me a lot even with some material not covered in classes. During the following winter break, <a href="https://www.cs.purdue.edu/people/faculty/hbenotma.html" style="color: black" target="_blank">Professor Benotman</a> helped me with my project. I also have received help from <a href="https://www.math.purdue.edu/people/bio/zhan1966" style="color:black" target="_blank">Professor Xiangxiong Zhang,</a> <a href="https://www.cs.purdue.edu/people/faculty/jhonorio.html" style="color:black" target="_blank">Professor Jean Honorio,</a> <a href="https://www.stat.purdue.edu/people/faculty/tqin.html" style="color:black" target="_blank">Tiantian Qin,</a> <a href="https://www.cs.purdue.edu/people/faculty/park.html" style="color:black" target="_blank">Professor Kihong Park,</a> <a href="https://www.cs.arizona.edu/person/melanie-lotz" style="color:black" target="_blank">Melanie</a> and <a href="https://www.cs.purdue.edu/people/faculty/hmaji.html" style="color:black" target="_blank">Professor Maji.</a> Thanks them a lot. Without them, I will not be confident and enegetic in studying.',
      zh: '刚进入普渡时，<a href="https://turkeyland.net/" style="color: black" target="_blank">Turkstra 教授</a>为我树立了一名计算机科学家的正确价值观。修读 CS 397（荣誉研讨课）时，<a href="https://beerkay.github.io/" style="color: black" target="_blank">Berkay 教授</a>在众多计算机科学荣誉学生中选择了我与他一起做项目。修读 CS 381（本科密码学）与 CS 580（研究生算法）时，<a href="https://www.cs.purdue.edu/homes/jblocki/" style="color: black" target="_blank">Blocki 教授</a>给了我很多帮助，甚至包括一些课堂上没有覆盖的内容。随后的寒假里，<a href="https://www.cs.purdue.edu/people/faculty/hbenotma.html" style="color: black" target="_blank">Benotman 教授</a>帮助我完成了项目。此外，我还得到了 <a href="https://www.math.purdue.edu/people/bio/zhan1966" style="color:black" target="_blank">张翔雄教授</a>、<a href="https://www.cs.purdue.edu/people/faculty/jhonorio.html" style="color:black" target="_blank">Jean Honorio 教授</a>、<a href="https://www.stat.purdue.edu/people/faculty/tqin.html" style="color:black" target="_blank">秦甜甜</a>、<a href="https://www.cs.purdue.edu/people/faculty/park.html" style="color:black" target="_blank">Kihong Park 教授</a>、<a href="https://www.cs.arizona.edu/person/melanie-lotz" style="color:black" target="_blank">Melanie</a>以及<a href="https://www.cs.purdue.edu/people/faculty/hmaji.html" style="color:black" target="_blank">Maji 教授</a>的诸多帮助。非常感谢他们。没有他们，我不会在学习中如此自信和充满活力。'
    },
    'thanks.p2': {
      en: 'It is my greatest honor to be a student of Professor Li Yuanchun and Professor Liu Yunxin. I cannot imagine what my PhD journey would have been like without their help. No words can fully express the help they have given me and my gratitude toward them. I would gladly vouch for them: they are excellent, outstanding, and kind professors and mentors.',
      zh: '能够成为李元春老师和刘云新教授的学生，是我无上的荣幸。难以想象，如果没有他们的帮助，我的博士生涯会是什么样的。无论用何种言语，都难以表达他们对我的帮助和我对他们的感谢之情。在此，我愿意为他们担保：他们是优秀的、杰出的、友善的教授和导师。'
    },

    /* ----- Education ----- */
    'education.h4':     { en: 'Education', zh: '教育经历' },
    'education.ug.h5':  { en: 'Undergraduate - Purdue University, West Lafayette, U.S.', zh: '本科 — 美国西拉法叶 普渡大学' },
    'education.ug.p': {
      en: 'Major in <a href="https://www.cs.purdue.edu/index.html" style="color:black" target="_blank">Computer Science</a> <a href="https://www.cs.purdue.edu/undergraduate/curriculum/honors.html" style="color:black" target="_blank"><b>Honor</b></a> (<a href="https://www.cs.purdue.edu/undergraduate/curriculum/track-mI-fall2023.html" style="color:black" target="_blank">Machine Intelligence</a> & <a href="https://www.cs.purdue.edu/undergraduate/curriculum/track-security-fall2023.html" style="color:black" target="_blank">Security</a>), <a href="https://www.math.purdue.edu/" style="color:black" target="_blank">Mathematics</a> and <a href="https://www.stat.purdue.edu/" style="color:black" target="_blank">Statistics</a>. <b>Yes, I am a triple major student!</b> (Well, that is true. However, due to the class overlapping, it is not thaaaaaaaat hard)',
      zh: '主修<a href="https://www.cs.purdue.edu/index.html" style="color:black" target="_blank">计算机科学</a><a href="https://www.cs.purdue.edu/undergraduate/curriculum/honors.html" style="color:black" target="_blank"><b>荣誉</b></a>方向（<a href="https://www.cs.purdue.edu/undergraduate/curriculum/track-mI-fall2023.html" style="color:black" target="_blank">人工智能</a>与<a href="https://www.cs.purdue.edu/undergraduate/curriculum/track-security-fall2023.html" style="color:black" target="_blank">安全</a>），以及<a href="https://www.math.purdue.edu/" style="color:black" target="_blank">数学</a>和<a href="https://www.stat.purdue.edu/" style="color:black" target="_blank">统计学</a>。<b>没错，我是三主修学生！</b>（确实如此。不过由于课程有所重叠，并没有那~么难。）'
    },
    'education.grad.h5': { en: 'Graduate - Tsinghua University, Beijing, China', zh: '研究生 — 中国北京 清华大学' },
    'education.grad.p': {
      en: 'Major in <a href="https://www.ee.tsinghua.edu.cn/en/" style="color:black" target="_blank">Electronic Engineering</a>. Belongs to <a href="https://air.tsinghua.edu.cn/en/" style="color:black" target="_blank">Institute for AI Industry Research (AIR)</a>. Advised by <a href="https://yunxinliu.github.io/" style="color:black" target="_blank">Professor Liu, Yunxin</a> and <a href="https://yuanchun-li.github.io/" style="color:black" target="_blank">Professor Li, Yuanchun</a>.',
      zh: '<a href="https://www.ee.tsinghua.edu.cn/en/" style="color:black" target="_blank">电子工程系</a>，隶属于<a href="https://air.tsinghua.edu.cn/en/" style="color:black" target="_blank">智能产业研究院（AIR）</a>，由<a href="https://yunxinliu.github.io/" style="color:black" target="_blank">刘云新教授</a>和<a href="https://yuanchun-li.github.io/" style="color:black" target="_blank">李元春老师</a>共同指导。'
    },

    /* ----- Publications ----- */
    'pubs.h4': { en: 'Publications', zh: '发表论文' },

    'pub.patchbackdoor.title': {
      en: 'PatchBackdoor: Backdoor Attack against Deep Neural Networks without Model Modification',
      zh: '《PatchBackdoor：无需修改模型的后门攻击方法》'
    },
    'pub.patchbackdoor.venue': {
      en: '[ACM MM 2023 (CCF-A)] In Proceedings of the 31st ACM International Conference on Multimedia.',
      zh: '[ACM MM 2023（CCF-A）] 发表于第 31 届 ACM 国际多媒体会议论文集。'
    },

    'pub.confrag.title': {
      en: 'Benchmarking LLM\'s Capability in Reasoning over Conflicting Web References',
      zh: '《评测大型语言模型在冲突网络参考资料上的推理能力》'
    },
    'pub.confrag.venue': { en: '[ACL 2026 (CCF-A)]', zh: '[ACL 2026（CCF-A）]' },

    'pub.levelkv.title': {
      en: 'LevelKV: Hierarchical KV Cache Pruning for Efficient and Reliable LLM Inference',
      zh: '《LevelKV：面向高效可靠大模型推理的分层 KV 缓存剪枝》'
    },
    'pub.levelkv.venue': {
      en: '[IEEE ToC (CCF-A)] Minor Revision Submitted',
      zh: '[IEEE ToC（CCF-A）] 小修返修中'
    },

    'pub.convrelu.title': {
      en: 'ConvReLU++: Reference-based Lossless Acceleration of Conv-ReLU Operations on Mobile CPU',
      zh: '《ConvReLU++：移动 CPU 上基于参考的无损 Conv-ReLU 运算加速》'
    },
    'pub.convrelu.venue': {
      en: '[MobiSys 2023 (CCF-B)] In Proceedings of the 21st ACM International Conference on Mobile Systems, Applications, and Services.',
      zh: '[MobiSys 2023（CCF-B）] 发表于第 21 届 ACM 移动系统、应用与服务国际会议论文集。'
    },

    'pub.emnlp.title': {
      en: 'An Empirical Study of LLM Reasoning Ability Under Strict Output Length Constraint',
      zh: '《严格输出长度约束下大模型推理能力的实证研究》'
    },
    'pub.emnlp.venue': { en: '[EMNLP 2025 (CCF-B)]', zh: '[EMNLP 2025（CCF-B）]' },

    'pub.wip.title': {
      en: 'WiP: An On-device LLM-based Approach to Query Privacy Protection',
      zh: '《WiP：一种基于端侧大模型的查询隐私保护方法》'
    },
    'pub.wip.venue': {
      en: '[MobiCom EdgeFM Workshop] In Proceedings of the Workshop on Edge and Mobile Foundation Models.',
      zh: '[MobiCom EdgeFM Workshop] 发表于边缘与移动基础模型研讨会论文集。'
    },

    'pub.aohp.title': {
      en: 'AOHP: An Open-Source OS-Level Agent Harness for Personalized, Efficient and Secure Interaction',
      zh: '《AOHP：面向个性化、高效、安全交互的开源操作系统级智能体基座（Harness）》'
    },
    'pub.aohp.venue': { en: '[arXiv Preprint]', zh: '[arXiv 预印本]' },

    /* ----- Patents ----- */
    'patent.h4': { en: 'Patents', zh: '技术专利' },
    'patent.title': {
      en: 'Method and Apparatus for Key-Value Cache Data Pruning Processing',
      zh: '《键值缓存数据剪枝处理方法和装置》'
    },
    'patent.appno': { en: 'Application No.: ', zh: '申请号：' },
    'patent.note': {
      en: 'This is a Chinese patent and has no official English title. The above name is a translation only and is not part of any official material.',
      zh: ''
    },
    'patent.desc': {
      en: 'Combines token attention scores with the activation importance of value vectors to perform comprehensive scoring and ranking, addressing the output distortion of traditional pruning; and implements graded caching and differentiated pruning based on the semantic attributes of prompts, improving the safety and controllability of models.',
      zh: '融合 token 注意力分数与 value 向量激活重要度进行综合评分排序，解决传统剪枝输出失真问题；并基于提示词语义属性进行分级缓存、差异化剪枝，提升模型的安全性与可控性。'
    },

    /* ----- White Papers ----- */
    'wp.h4': { en: 'White Papers', zh: '白皮书' },

    'wp.pla.title': {
      en: 'Personal LLM Agents: Insights and Survey about the Capability, Efficiency and Security',
      zh: '《Personal LLM Agents：关于能力、效率与安全性的见解与综述》'
    },
    'wp.pla.kind': {
      en: 'Preprint/Survey about Personal Large Language Models.',
      zh: '关于个人大语言模型的预印本 / 综述。'
    },
    'wp.pla.projlead': { en: 'Project Lead: ', zh: '项目负责人：' },
    'wp.pla.seclead':  { en: 'Section Lead: ',  zh: '章节负责人：' },
    'wp.pla.coop':     { en: 'Cooperate With:', zh: '合作者：' },
    'wp.pla.security': {
      en: 'If you have any question about "Section Security", please let me know, I am responsible for this Section.',
      zh: '如果您对「安全章节」有任何疑问，请随时联系我，我负责这一章节。'
    },

    'wp.l1l5.title': {
      en: 'White Paper on the L1-L5 Safety Framework for General-Purpose AI Agents',
      zh: '《通用人工智能智能体 L1-L5 分级安全框架白皮书》'
    },
    'wp.l1l5.kind': {
      en: '[WAIC 2026] Co-authored with Shanghai AI Laboratory, Tsinghua AIR, Concordia AI, and Huawei.',
      zh: '[WAIC 2026] 与上海人工智能实验室、清华大学智能产业研究院（AIR）、安远 AI 及华为共同撰写。'
    },
    'wp.l1l5.author': { en: ' (sole student author from AIR)', zh: '（AIR 唯一学生作者）' },

    /* ----- Contact ----- */
    'contact.h6': { en: 'Contact Information', zh: '联系方式' },
    'contact.p': {
      en: 'If you want to know more about my research/Purdue/Tsinghua, I am glad to answer.',
      zh: '如果您想了解更多关于我的研究、普渡或清华的经历，我很乐意解答。'
    }
  };

  /* ------------------------------------------------------------------ */
  /* 逻辑                                                               */
  /* ------------------------------------------------------------------ */

  var docEl = document.documentElement;

  function detectLang() {
    var saved = null;
    try { saved = window.localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (saved === 'zh' || saved === 'en') { return saved; }
    var nav = (window.navigator.language || 'en').toLowerCase();
    return (nav.indexOf('zh') === 0) ? 'zh' : 'en';
  }

  function apply(lang) {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      var entry = I18N[key];
      if (!entry) { continue; }
      el.innerHTML = entry[lang] || entry.en;
    }
    docEl.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.title = 'Yizhen Yuan';
    updateToggle(lang);
  }

  function updateToggle(lang) {
    var tt = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < tt.length; i++) {
      tt[i].textContent = (lang === 'zh') ? 'EN' : '中文';
      tt[i].setAttribute('data-current-lang', lang);
    }
  }

  function setLang(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    apply(lang);
  }

  function bindToggle() {
    var toggles = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (e) {
        e.preventDefault();
        var cur = this.getAttribute('data-current-lang') || 'en';
        setLang(cur === 'zh' ? 'en' : 'zh');
      });
    }
  }

  function init() {
    apply(detectLang());
    bindToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.i18n = {
    apply: apply,
    setLang: setLang,
    getLang: function () { return docEl.getAttribute('lang') === 'zh-CN' ? 'zh' : 'en'; }
  };
})(window, document);
