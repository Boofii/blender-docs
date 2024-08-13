import{_ as s,c as i,o as a,a2 as e}from"./chunks/framework.DlC1fzyH.js";const c=JSON.parse('{"title":"Custom Supers","description":"","frontmatter":{},"headers":[],"relativePath":"custom_supers.md","filePath":"custom_supers.md"}'),t={name:"custom_supers.md"},n=e(`<h1 id="custom-supers" tabindex="-1">Custom Supers <a class="header-anchor" href="#custom-supers" aria-label="Permalink to &quot;Custom Supers&quot;">​</a></h1><h2 id="creating-the-super-in-unity" tabindex="-1">Creating the super in Unity <a class="header-anchor" href="#creating-the-super-in-unity" aria-label="Permalink to &quot;Creating the super in Unity&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This is a more advanced tutorial, and requires a bit of unity editor knowledge.<br> It is recommended to watch a short tutorial series on youtube before proceeding, unless you already know the basics.</p></div><div class="warning custom-block"><p class="custom-block-title">IMPORTANT</p><p>When working with level objects, it is important to set the main camera&#39;s size to 360. When setting it, you will notice that your sprites are barely visible, so set their <code>Pixels Per Unit</code> value in their import settings to a low value like 1.</p></div><p>Like in the charms tutorial, we will choose an id for the custom super. This id must start with <code>level_super_</code> and must be unique.<br> Supers are built from two required objects in the following order:<br></p><ol><li>A cuphead animation</li><li>A mugman animation<br></li></ol><ol><li>Create a game object named after the super id you chose. Add to it two game objects with a <code>SpriteRenderer</code> component and an <code>Animator</code> component.</li><li>Create an animation for Cuphead and an animation for Mugman.</li><li>Drag the super object to <code>Assets</code> and put the new prefab in a new asset bundle that will contain all of the future supers for your mod.</li><li>Generate the new bundle and put it in your mod&#39;s <code>Assets</code> directory.</li></ol><h2 id="adding-the-super" tabindex="-1">Adding the super <a class="header-anchor" href="#adding-the-super" aria-label="Permalink to &quot;Adding the super&quot;">​</a></h2><p>Registering supers is done using the <code>EquipRegistries.Supers.Register</code> method.<br> Here is a base example for registering a super:</p><div class="language-cs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> atlasPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Blender:super_icons</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">atlas&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bundlePath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Blender:supers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> superId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;level_super_explosion&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Super</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> explosion</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> EquipRegistries.Supers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(superId,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SuperInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TheSuperType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), bundlePath)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SetAtlasPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(atlasPath)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SetNormalIcons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;explosion0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;explosion1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;explosion2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AsSuperInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div><p>Here, <code>bundlePath</code> is the path to the bundle that contains all of your mod&#39;s supers.<br><code>superId</code> is a unique id for your super that must be exactly the same as the one you had in unity.<br><code>TheSuperType</code> is the type that will contain the behaviour for your custom super.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you want your super to be used for Chalice, you can call the following for the <code>SuperInfo</code>:</p><div class="language-cs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SetChaliceSuper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div></div><h2 id="adding-custom-behaviour" tabindex="-1">Adding Custom Behaviour <a class="header-anchor" href="#adding-custom-behaviour" aria-label="Permalink to &quot;Adding Custom Behaviour&quot;">​</a></h2><p>Create a new class that inherits from <code>AbstractPlayerSuper</code>. Here is an example for a basic one:</p><div class="language-cs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TheSuperType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AbstractPlayerSuper</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> override</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> StartSuper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">StartSuper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        AudioManager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;player_super_ghost&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        StartCoroutine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DoSuper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IEnumerator</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DoSuper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        yield</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WaitForSeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        Fire</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //Execute super</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        yield</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WaitForSeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        Destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.gameObject);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,15),h=[n];function l(p,k,r,o,d,u){return a(),i("div",null,h)}const g=s(t,[["render",l]]);export{c as __pageData,g as default};
