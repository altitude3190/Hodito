import m from 'mithril';

export default controller => {
    return <article>
        <h1 class="title"> { controller.model.title() } </h1>
        <p class="subtitle is-6">
          created_at:  <span id='created-at'>2016/08/17 18:00:98</span> /
          updated_at:  <span id='updated-at'>2016/08/19 18:00:98</span>
        </p>

        <div id='note-body' class="content">
          <h2>header2</h2>
          <h3>header3</h3>
          <p><strong>強調表示</strong></p>
          <p><em>イタリック</em></p>
          <blockquote>
          <p>引用分のサンプル
          引用分のサンプル
          引用分のサンプル</p>
          </blockquote>
          <table>
          <thead>
          <tr>
          <th style="text-align: center;">col1</th>
          <th style="text-align: left;">col2</th>
          <th style="text-align: right;">col3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style="text-align: center;">data1</td>
          <td style="text-align: left;">data1</td>
          <td style="text-align: right;">data1</td>
          </tr>
          <tr>
          <td style="text-align: center;">data2</td>
          <td style="text-align: left;">data2</td>
          <td style="text-align: right;">data2</td>
          </tr>
          <tr>
          <td style="text-align: center;">data3</td>
          <td style="text-align: left;">data3</td>
          <td style="text-align: right;">data3</td>
          </tr>
          </tbody>
          </table>
          <p><a href="https://google.co.jp">リンク</a></p>

          <h2>header2</h2>
          <h3>header3</h3>
          <p><strong>強調表示</strong></p>
          <p><em>イタリック</em></p>
          <blockquote>
          <p>引用分のサンプル
          引用分のサンプル
          引用分のサンプル</p>
          </blockquote>
          <table>
          <thead>
          <tr>
          <th style="text-align: center;">col1</th>
          <th style="text-align: left;">col2</th>
          <th style="text-align: right;">col3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style="text-align: center;">data1</td>
          <td style="text-align: left;">data1</td>
          <td style="text-align: right;">data1</td>
          </tr>
          <tr>
          <td style="text-align: center;">data2</td>
          <td style="text-align: left;">data2</td>
          <td style="text-align: right;">data2</td>
          </tr>
          <tr>
          <td style="text-align: center;">data3</td>
          <td style="text-align: left;">data3</td>
          <td style="text-align: right;">data3</td>
          </tr>
          </tbody>
          </table>
          <p><a href="https://google.co.jp">リンク</a></p>
          <h2>header2</h2>
          <h3>header3</h3>
          <p><strong>強調表示</strong></p>
          <p><em>イタリック</em></p>
          <blockquote>
          <p>引用分のサンプル
          引用分のサンプル
          引用分のサンプル</p>
          </blockquote>
          <table>
          <thead>
          <tr>
          <th style="text-align: center;">col1</th>
          <th style="text-align: left;">col2</th>
          <th style="text-align: right;">col3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style="text-align: center;">data1</td>
          <td style="text-align: left;">data1</td>
          <td style="text-align: right;">data1</td>
          </tr>
          <tr>
          <td style="text-align: center;">data2</td>
          <td style="text-align: left;">data2</td>
          <td style="text-align: right;">data2</td>
          </tr>
          <tr>
          <td style="text-align: center;">data3</td>
          <td style="text-align: left;">data3</td>
          <td style="text-align: right;">data3</td>
          </tr>
          </tbody>
          </table>
          <p><a href="https://google.co.jp">リンク</a></p>
        </div>
      </article>
};
